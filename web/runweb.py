# -*- coding:utf-8 -*-
"""
    功能：数据分析于可视化
"""

from flask import Flask, render_template
import json

from tools.dbutils import DBUtils
from tools.get_config import get_db_config

JSON_PATH = 'config.json'
db_info = get_db_config(JSON_PATH)
db_user = db_info['user']
db_password = db_info['password']
db_name = db_info['db_name']

app = Flask(__name__)


def get_db_conn():
    """
    获取数据库连接
    :return: db_conn 数据库连接对象
    """
    return DBUtils(host='localhost', user=db_user, password=db_password, db=db_name)


def msg(status, data='未加载到数据'):
    """
    :param status: 状态码 200成功，201未找到数据
    :param data: 响应数据
    :return: 字典 如{'status': 201, 'data': ‘未加载到数据’}
    """
    return json.dumps({'status': status, 'data': data})


@app.route('/')
def index():
    """
    首页
    :return: index.html 跳转到首页
    """
    return render_template('index.html')


@app.route('/getwordcloud')
def get_word_cloud():
    """
    获取岗位福利词云数据
    :return:
    """
    db_conn = get_db_conn()
    text = \
        db_conn.get_one(sql_str="SELECT GROUP_CONCAT(job_welfare) FROM t_boss_zp_info")[0]
    if text is None:
        return msg(201)
    return msg(200, text)


@app.route('/getjobinfo')
def get_job_info():
    """
    获取热门岗位招聘区域分布
    :return:
    """
    db_conn = get_db_conn()
    # {"city":"北京","info":[{"district":"朝阳区","num":27},{"海淀区":43}]}
    results = db_conn.get_all(
        # sql_str="SELECT city,district,COUNT(1) as num FROM t_boss_zp_info GROUP BY city,district")
        sql_str="SELECT city, district, COUNT(1) as num FROM t_boss_zp_info GROUP BY city, district HAVING num > 20"
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


@app.route('/getjobnum')
def get_job_num():
    """
    获取个城市岗位数量
    :return:
    """
    db_conn = get_db_conn()
    results = db_conn.get_all(
        sql_str="SELECT city, COUNT(1) num FROM t_boss_zp_info GROUP BY city HAVING num > 10"
    )
    if results is None or len(results) == 0:
        return msg(201)
    if results is None or len(results) == 0:
        return msg(201)
    data = []
    for r in results:
        data.append(list(r))
    return msg(200, data)


@app.route('/getprovince')
def get_province():
    """
    获取个省份岗位数量
    :return:
    """
    db_conn = get_db_conn()
    results = db_conn.get_all(sql_str="SELECT province,COUNT(1) num FROM t_boss_zp_info GROUP BY province")
    if results is None or len(results) == 0:
        return msg(201)
    if results is None or len(results) == 0:
        return msg(201)
    data = []
    for r in results:
        data.append(list(r))
    return msg(200, data)


@app.route('/getcomtypenum')
def get_job_industry_num():
    """
    获取企业类型占比
    :return:
    """
    db_conn = get_db_conn()
    results = db_conn.get_all(
        sql_str="SELECT job_industry, ROUND(COUNT(1)/(SELECT SUM(t1.num) FROM (SELECT COUNT(1) num FROM t_boss_zp_info GROUP BY job_industry) t1)*100,2) percent FROM t_boss_zp_info GROUP BY job_industry")
    if results is None or len(results) == 0:
        return msg(201)
    data = []
    for r in results:
        data.append({'name': r[0], 'y': float(r[1])})
    return msg(200, data)


@app.route('/getsubcategorynum')
def get_sub_category_num():
    """
    获取开发方向占比
    :return:
    """
    db_conn = get_db_conn()
    results = db_conn.get_all(
        sql_str="SELECT sub_category, ROUND(COUNT(1)/(SELECT SUM(t1.num) FROM (SELECT COUNT(1) num FROM t_boss_zp_info GROUP BY sub_category) t1)*100,2) percent FROM t_boss_zp_info GROUP BY sub_category")
    if results is None or len(results) == 0:
        return msg(201)
    data = []
    for r in results:
        data.append({'name': r[0], 'y': float(r[1])})
    return msg(200, data)


# 扇形图
@app.route('/geteducationnum')
def geteducationnum():
    """
    获取学历占比
    :return:
    """
    db_conn = get_db_conn()
    results = db_conn.get_all(
        sql_str="SELECT t1.job_education,ROUND(t1.num/(SELECT SUM(t2.num) FROM(SELECT COUNT(1) num FROM t_boss_zp_info t GROUP BY t.job_education)t2)*100,2) FROM( SELECT t.job_education,COUNT(1) num FROM t_boss_zp_info t GROUP BY t.job_education) t1"
    )
    if results is None or len(results) == 0:
        return msg(201)
    data = []
    for r in results:
        data.append([r[0], float(r[1])])
    return msg(200, data)


# 获取排行榜
@app.route('/getorder')
def getorder():
    """
    获取企业招聘数量排行榜
    :return:
    """
    db_conn = get_db_conn()
    results = db_conn.get_all(
        sql_str="SELECT t.job_company,COUNT(1) FROM t_boss_zp_info t GROUP BY t.job_company ORDER BY COUNT(1) DESC LIMIT 10")
    if results is None or len(results) == 0:
        return msg(201)
    data = []
    for i, r in enumerate(results):
        data.append({'id': i + 1,
                     'name': r[0],
                     'num': r[1]})
    return msg(200, data)


# 获取排行榜
@app.route('/getfieldorder')
def getfieldorder():
    """
    获取开发方向数量排行榜
    :return:
    """
    db_conn = get_db_conn()
    results = db_conn.get_all(
        sql_str="SELECT t.category,COUNT(1) FROM t_boss_zp_info t GROUP BY t.category ORDER BY COUNT(1) DESC LIMIT 10")
    if results is None or len(results) == 0:
        return msg(201)
    data = []
    for i, r in enumerate(results):
        data.append({'id': i + 1,
                     'name': r[0],
                     'num': r[1]})
    return msg(200, data)


@app.route('/getjson')
def getjson():
    """
    获取配置文件信息
    static/config/config.json
    :return:
    """
    with open(JSON_PATH, 'r') as file:
        config = json.load(file)
        normal_data = config.get('normal', {})
    return msg(200, normal_data)


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
