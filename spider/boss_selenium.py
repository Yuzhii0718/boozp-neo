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
city_map = {
    "北京": ["北京"],
    "天津": ["天津"],
    "山西": ["太原", "阳泉", "晋城", "长治", "临汾", "运城", "忻州", "吕梁", "晋中", "大同", "朔州"],
    "河北": ["沧州", "石家庄", "唐山", "保定", "廊坊", "衡水", "邯郸", "邢台", "张家口", "辛集", "秦皇岛", "定州",
             "承德", "涿州"],
    "山东": ["济南", "淄博", "聊城", "德州", "滨州", "济宁", "菏泽", "枣庄", "烟台", "威海", "泰安", "青岛", "临沂",
             "莱芜", "东营", "潍坊", "日照"],
    "河南": ["郑州", "新乡", "鹤壁", "安阳", "焦作", "濮阳", "开封", "驻马店", "商丘", "三门峡", "南阳", "洛阳", "周口",
             "许昌", "信阳", "漯河", "平顶山", "济源"],
    "广东": ["珠海", "中山", "肇庆", "深圳", "清远", "揭阳", "江门", "惠州", "河源", "广州", "佛山", "东莞", "潮州",
             "汕尾", "梅州", "阳江", "云浮", "韶关", "湛江", "汕头", "茂名"],
    "浙江": ["舟山", "温州", "台州", "绍兴", "衢州", "宁波", "丽水", "金华", "嘉兴", "湖州", "杭州"],
    "宁夏": ["中卫", "银川", "吴忠", "石嘴山", "固原"],
    "江苏": ["镇江", "扬州", "盐城", "徐州", "宿迁", "无锡", "苏州", "南通", "南京", "连云港", "淮安", "常州", "泰州"],
    "湖南": ["长沙", "邵阳", "怀化", "株洲", "张家界", "永州", "益阳", "湘西", "娄底", "衡阳", "郴州", "岳阳", "常德",
             "湘潭"],
    "吉林": ["长春", "长春", "通化", "松原", "四平", "辽源", "吉林", "延边", "白山", "白城"],
    "福建": ["漳州", "厦门", "福州", "三明", "莆田", "宁德", "南平", "龙岩", "泉州"],
    "甘肃": ["张掖", "陇南", "兰州", "嘉峪关", "白银", "武威", "天水", "庆阳", "平凉", "临夏", "酒泉", "金昌", "甘南",
             "定西"],
    "陕西": ["榆林", "西安", "延安", "咸阳", "渭南", "铜川", "商洛", "汉中", "宝鸡", "安康"],
    "辽宁": ["营口", "铁岭", "沈阳", "盘锦", "辽阳", "锦州", "葫芦岛", "阜新", "抚顺", "丹东", "大连", "朝阳", "本溪",
             "鞍山"],
    "江西": ["鹰潭", "宜春", "上饶", "萍乡", "南昌", "景德镇", "吉安", "抚州", "新余", "九江", "赣州"],
    "黑龙江": ["伊春", "七台河", "牡丹江", "鸡西", "黑河", "鹤岗", "哈尔滨", "大兴安岭", "绥化", "双鸭山", "齐齐哈尔",
               "佳木斯", "大庆"],
    "安徽": ["宣城", "铜陵", "六安", "黄山", "淮南", "合肥", "阜阳", "亳州", "安庆", "池州", "宿州", "芜湖", "马鞍山",
             "淮北", "滁州", "蚌埠"],
    "湖北": ["孝感", "武汉", "十堰", "荆门", "黄冈", "襄阳", "咸宁", "随州", "黄石", "恩施", "鄂州", "荆州", "宜昌",
             "潜江", "天门", "神农架", "仙桃"],
    "青海": ["西宁", "海西", "海东", "玉树", "黄南", "海南", "海北", "果洛"],
    "新疆": ["乌鲁木齐", "克州", "阿勒泰", "五家渠", "石河子", "伊犁", "吐鲁番", "塔城", "克拉玛依", "喀什", "和田",
             "哈密", "昌吉", "博尔塔拉", "阿克苏", "巴音郭楞", "阿拉尔", "图木舒克", "铁门关"],
    "贵州": ["铜仁", "黔东南", "贵阳", "安顺", "遵义", "黔西南", "黔南", "六盘水", "毕节"],
    "四川": ["遂宁", "攀枝花", "眉山", "凉山", "成都", "巴中", "广安", "自贡", "甘孜", "资阳", "宜宾", "雅安", "内江",
             "南充", "绵阳", "泸州", "凉山", "乐山", "广元", "甘孜", "德阳", "达州", "阿坝"],
    "上海": ["上海"],
    "广西": ["南宁", "贵港", "玉林", "梧州", "钦州", "柳州", "来宾", "贺州", "河池", "桂林", "防城港", "崇左", "北海",
             "百色"],
    "西藏": ["拉萨", "山南", "日喀则", "那曲", "林芝", "昌都", "阿里"],
    "云南": ["昆明", "红河", "大理", "玉溪", "昭通", "西双版纳", "文山", "曲靖", "普洱", "怒江", "临沧", "丽江", "红河",
             "迪庆", "德宏", "大理", "楚雄", "保山"],
    "内蒙古": ["呼和浩特", "乌兰察布", "兴安", "赤峰", "呼伦贝尔", "锡林郭勒", "乌海", "通辽", "巴彦淖尔", "阿拉善",
               "鄂尔多斯", "包头"],
    "海南": ["海口", "三沙", "三亚", "临高", "五指山", "陵水", "文昌", "万宁", "白沙", "乐东", "澄迈", "屯昌", "定安",
             "东方", "保亭", "琼中", "琼海", "儋州", "昌江"],
    "重庆": ["重庆"]
}


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
