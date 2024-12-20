#!/usr/bin/python
# -*- coding:utf-8 -*-
# @author  : Yuzhii
# @time    : 2024/12/20 21:31
# @function: 数据分析于可视化
# @version : V3

from flask import Flask, render_template
import json

from tools.dbutils import DBUtils
from tools.get_config import get_db_config

JSON_PATH = 'config.json'
db_info = get_db_config()
db_ctable = db_info['cleaned_table']

app = Flask(__name__)


def get_db_conn():
    """
    获取数据库连接
    :return: db_conn 数据库连接对象
    """
    return DBUtils()


def msg(status, data='未加载到数据'):
    """
    :param status: 状态码 200成功，201未找到数据
    :param data: 响应数据
    :return: 字典 如{'status': 201, 'data': ‘未加载到数据’}
    """
    return json.dumps({'status': status, 'data': data})


def get_data(sql_str, method='a'):
    db_conn = get_db_conn()
    results = db_conn.get_all(sql_str)
    if results is None or len(results) == 0:
        return msg(201)
    data = []
    if method == 'a':
        for r in results:
            data.append({'name': r[0], 'y': float(r[1])})
    elif method == 'b':
        for r in results:
            data.append(list(r))
    elif method == 'c':
        for i, r in enumerate(results):
            data.append({'id': i + 1,
                         'name': r[0],
                         'num': r[1]})
    return msg(200, data)


@app.route('/')
def index():
    """
    首页
    :return: index.html 跳转到首页
    """
    return render_template('index.html')


@app.route('/get_word_cloud')
def get_word_cloud():
    """
    获取岗位福利词云数据
    :keyword: job_welfare 词云
    :return:
    """
    sql_str = "SELECT GROUP_CONCAT(job_welfare) FROM {}".format(db_ctable)
    db_conn = get_db_conn()
    text = db_conn.get_one(sql_str)[0]
    if text is None:
        return msg(201)
    return msg(200, text)


@app.route('/get_job_info')
def get_job_info():
    """
    获取热门岗位招聘区域分布
    :keyword: city, district 聚合图
    :return:
    """
    db_conn = get_db_conn()
    results = db_conn.get_all(
        sql_str="SELECT city, district, COUNT(1) as num FROM {} GROUP BY city, district HAVING num > 20".format(
            db_ctable)
    )

    if results is None or len(results) == 0:
        return msg(201)
    data = []
    city_detail = {}
    for r in results:
        info = {'name': r[1], 'value': r[2]}
        if r[0] not in city_detail:
            city_detail[r[0]] = [info]
        else:
            city_detail[r[0]].append(info)
    for k, v in city_detail.items():
        temp = {'name': k, 'data': v}
        data.append(temp)
    return msg(200, data)


@app.route('/get_job_num')
def get_job_num():
    """
    获取个城市岗位数量
    keyword: city 柱状图 城市
    :return:
    """
    sql_str = "SELECT city, COUNT(1) num FROM {} GROUP BY city HAVING num > 5".format(db_ctable)
    return get_data(sql_str, 'b')


@app.route('/get_min_salary')
def get_min_salary():
    """
    获取最低薪资
    keyword: salary_lower 柱状图 最低薪资
    :return:
    """
    sql_str = "SELECT salary_lower, COUNT(1) num FROM {} GROUP BY salary_lower HAVING num > 10".format(db_ctable)
    return get_data(sql_str, 'b')


@app.route('/get_province')
def get_province():
    """
    获取个省份岗位数量
    :keyword: province 聚合图 省份
    :return:
    """
    sql_str = "SELECT province,COUNT(1) num FROM {} GROUP BY province".format(db_ctable)
    return get_data(sql_str, 'b')


@app.route('/get_job_industry_num')
def get_job_industry_num():
    """
    获取专业类型占比
    :keyword: job_industry 饼图 专业类型
    :return:
    """
    sql_str = "SELECT job_industry, ROUND(COUNT(1)/(SELECT SUM(t1.num) FROM (SELECT COUNT(1) num FROM t_boss_zp_info GROUP BY job_industry) t1)*100,2) percent FROM t_boss_zp_info GROUP BY job_industry"
    return get_data(sql_str)


@app.route('/get_sub_category_num')
def get_sub_category_num():
    """
    获取开发方向占比
    :keyword: sub_category 饼图 开发方向 子分类
    :return:
    """
    sql_str = "SELECT sub_category, ROUND(COUNT(1)/(SELECT SUM(t1.num) FROM (SELECT COUNT(1) num FROM {tab} GROUP BY sub_category) t1)*100,2) percent FROM {tab} GROUP BY sub_category".format(
        tab=db_ctable)
    return get_data(sql_str)


# 扇形图
@app.route('/get_education_num')
def get_education_num():
    """
    获取学历占比
    :keyword: job_education 半环图 学历
    :return:
    """
    sql_str = "SELECT job_education, ROUND(COUNT(1)/(SELECT SUM(t1.num) FROM (SELECT COUNT(1) num FROM {tab} GROUP BY job_education) t1)*100,2) percent FROM {tab} GROUP BY job_education".format(
        tab=db_ctable)
    return get_data(sql_str)


@app.route('/get_com_finance')
def get_com_finance():
    """
    获取金融占比
    :keyword: job_education 半环图 金融
    :return:
    """
    sql_str = "SELECT job_finance, ROUND(COUNT(1)/(SELECT SUM(t1.num) FROM (SELECT COUNT(1) num FROM {tab} GROUP BY job_finance) t1)*100,2) percent FROM {tab} GROUP BY job_finance".format(
        tab=db_ctable)
    return get_data(sql_str)


# 获取排行榜
@app.route('/get_order')
def get_order():
    """
    获取企业招聘数量排行榜
    :keyword: job_company 列表 企业
    :return:
    """
    sql_str = "SELECT job_company,COUNT(1) FROM {} GROUP BY job_company ORDER BY COUNT(1) DESC LIMIT 10".format(
        db_ctable)
    return get_data(sql_str, 'c')


# 获取排行榜
@app.route('/get_field_order')
def get_field_order():
    """
    获取开发方向数量排行榜
    :keyword: job_industry 列表 开发方向
    :return:
    """
    sql_str = "SELECT job_industry,COUNT(1) FROM {} GROUP BY job_industry ORDER BY COUNT(1) DESC LIMIT 10".format(
        db_ctable)
    return get_data(sql_str, 'c')


@app.route('/get_json')
def get_json():
    """
    获取配置文件信息
    :return:
    """
    with open(JSON_PATH, 'r') as file:
        config = json.load(file)
        normal_data = config.get('normal', {})
    return msg(200, normal_data)


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
