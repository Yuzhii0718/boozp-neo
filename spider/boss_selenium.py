#!/usr/bin/python
# -*- coding:utf-8 -*-
# @author  : Yuzhii
# @time    : 2024/12/19 17:40
# @function: the script is used to do something.
# @version : V2

import datetime
import time

from selenium import webdriver
from selenium.webdriver.common.by import By

from tools.dbutils import DBUtils
from tools.configmanager import ConfigManager as cm

from city_map import city_map

db_info = cm.database()
db_table = db_info['original_table']

spider = cm.spider()
start_page = spider['start_page']
end_page = spider['end_page']
crawl_url = spider['url']
browser_type = spider['browser_type']

print("browser_type:", browser_type)

if browser_type == 'Edge':
    browser = webdriver.Edge()
elif browser_type == 'Chrome':
    browser = webdriver.Chrome()
elif browser_type == 'Firefox':
    browser = webdriver.Firefox()
else:
    raise ValueError(f"Unsupported browser type: {browser_type}")

index_url = crawl_url
today = datetime.date.today().strftime('%Y-%m-%d')

def init_browser():
    # 缩放至 75%
    browser.execute_script("document.body.style.zoom='75%'")
    # 互联网/AI 展示出岗位分类显示的 tab 元素
    tab_ele = browser.find_element(by=By.XPATH, value='//*[@id="main"]/div/div[1]/div/div[1]/dl[1]/div')
    # 给 tab 元素添加css height=800px
    browser.execute_script("arguments[0].setAttribute('style', 'height: 800px;')", tab_ele)


# 模拟点击 互联网/AI 展示出岗位分类
def click_show():
    show_ele = browser.find_element(by=By.XPATH, value='//*[@id="main"]/div/div[1]/div/div[1]/dl[1]/dd/b')
    show_ele.click()
    time.sleep(2)


def retry_web():
    browser.get(index_url)
    time.sleep(3)
    init_browser()
    # 模拟点击 互联网/AI 展示出岗位分类
    click_show()


# 打开 boss 首页
browser.get(index_url)
# 最大化窗口
browser.maximize_window()
time.sleep(1)
init_browser()
click_show()

for i in range(start_page, end_page):
    category_label = \
        browser.find_elements(by=By.XPATH, value='//*[@id="main"]/div/div[1]/div/div[1]/dl[1]/div/ul/li/div/a')[i]
    current_a = browser.find_elements(by=By.XPATH, value='//*[@id="main"]/div/div[1]/div/div[1]/dl[1]/div/ul/li/div/a')[
        i]
    current_category = current_a.find_element(by=By.XPATH, value='../../h4').text
    sub_category = current_a.text
    # 当前 i 位置的分类
    print("正在抓取第{}个分类".format(i))
    print("{}正在抓取{}--{}".format(today, current_category, sub_category))
    try:
        category_label.click()
    except:
        time.sleep(2)
        retry_web()
        category_label.click()
    # 模拟滑动页面
    browser.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    time.sleep(10)
    # 模拟滑动页面
    browser.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    time.sleep(3)
    job_detail = browser.find_elements(by=By.XPATH,
                                       value='//*[@id="wrap"]/div[2]/div[2]/div/div[1]/div[2]/ul/li')
    for job in job_detail:
        # 获取数据库连接
        db = DBUtils()
        # 岗位名称
        try:
            job_title = job.find_element(by=By.XPATH, value="./div[1]/a/div[1]/span[1]").text.strip()
        except:
            continue
        # 工作地址
        job_location = job.find_element(by=By.XPATH, value="./div[1]/a/div[1]/span[2]/span").text.strip()
        # 企业名称
        job_company = job.find_element(by=By.XPATH, value="./div[1]/div/div[2]/h3/a").text.strip()
        # 行业类型
        job_industry = job.find_element(by=By.XPATH, value="./div[1]/div/div[2]/ul/li[1]").text.strip()
        # 融资情况
        job_finance = job.find_element(by=By.XPATH, value="./div[1]/div/div[2]/ul/li[2]").text.strip()
        try:
            # 企业规模
            job_scale = job.find_element(by=By.XPATH, value="./div[1]/div/div[2]/ul/li[3]").text.strip()
        except:
            job_scale = "无"
        try:
            # 企业福利
            job_welfare = job.find_element(by=By.XPATH, value="./div[2]/div").text.strip()
        except:
            job_welfare = '无'
        # 薪资范围
        job_salary_range = job.find_element(by=By.XPATH, value="./div[1]/a/div[2]/span[1]").text.strip()
        # 工作年限
        job_experience = job.find_element(by=By.XPATH, value="./div[1]/a/div[2]/ul/li[1]").text.strip()
        # 学历要求
        job_education = job.find_element(by=By.XPATH, value="./div[1]/a/div[2]/ul/li[2]").text.strip()
        # 技能要求
        try:
            job_skills = ','.join(
                [skill.text.strip() for skill in job.find_elements(by=By.XPATH, value="./div[2]/ul/li")])
        except:
            job_skills = '无'
        province = ''
        city = job_location.split('·')[0]
        for p, cities in city_map.items():
            if city in cities:
                province = p
                break
        print(current_category, sub_category, job_title, province, job_location, job_company, job_industry, job_finance,
              job_scale, job_welfare, job_salary_range, job_experience, job_education, job_skills)
        # 保存到 MySQL 数据库
        savesql = "INSERT INTO {} (category, sub_category, job_title, province, job_location, job_company, job_industry, job_finance, job_scale, job_welfare, job_salary_range, job_experience, job_education, job_skills, create_time) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)".format(
            db_table)
        db.insert_data(
            savesql,
            args=(
                current_category, sub_category, job_title, province, job_location, job_company, job_industry,
                job_finance,
                job_scale, job_welfare, job_salary_range, job_experience, job_education, job_skills, today))
        db.close()
    try:
        # 退回到首页
        # browser.back()
        retry_web()
    except:
        retry_web()
time.sleep(10)

print("爬取完成")
