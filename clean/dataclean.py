#!/usr/bin/python
# -*- coding:utf-8 -*-
# @author  : Yuzhii
# @time    : 2024/12/19 20:14
# @function: 对岗位数据进行清洗与预处理
# @version : V2

import pandas as pd
from sqlalchemy import create_engine
import logging
import os
import re

from tools.get_config import get_normal
from tools.get_config import get_db_config
from tools.get_config import get_cleaner
from tools.dbutils import DBUtils

normal = get_normal()
normal_time = normal['get_time']

db_info = get_db_config()
db_user = db_info['user']
db_password = db_info['password']
db_name = db_info['db_name']
db_host = db_info['host']
db_port = db_info['port']
db_charset = db_info['charset']
db_otable = db_info['original_table']
db_ctable = db_info['cleaned_table']

cleaner = get_cleaner()
source_data = cleaner['source_data']

# 如果不存在 input_data, output_data 文件夹，则创建
if not os.path.exists('input_data'):
    os.makedirs('input_data')
if not os.path.exists('output_data'):
    os.makedirs('output_data')

in_csv_path = 'input_data/{}.csv'.format(db_otable)

# 读取 招聘数据
if source_data == 'csv':
    all_city_zp_df = pd.read_csv(in_csv_path, encoding=db_charset, header=None,
                                 names=["category", "sub_category", "job_title", "province", "job_location",
                                        "job_company",
                                        "job_industry", "job_finance", "job_scale", "job_welfare", "job_salary_range",
                                        "job_experience", "job_education", "job_skills", "create_time"])
elif source_data == 'mysql':
    sql_path = "mysql+pymysql://{}:{}@{}:{}/{}?charset={}".format(db_user, db_password, db_host, db_port, db_name,
                                                                  db_charset)
    engine = create_engine(sql_path)
    all_city_zp_df = pd.read_sql_table(db_otable, engine)
else:
    logging.error("source_data is not supported!")
    print("source_data is not supported!")

# 对重复行进行清洗。
all_city_zp_df.drop_duplicates(inplace=True)

# 对`工作地址`字段进行预处理。要求：北京·海淀区·西北旺 --> 北京，海淀区，西北旺。分隔成3个字段
all_city_zp_area_df = all_city_zp_df['job_location'].str.split('·', expand=True)
all_city_zp_area_df = all_city_zp_area_df.rename(columns={0: "city", 1: "district", 2: "street", 3: "community"})
all_city_zp_area_df['community'] = all_city_zp_area_df['community'].fillna('')


# 对“月薪”进行处理，如果是 10000-20000元/月 --> 最低 10000元/月 最高 20000元/月
# 对“时薪”进行处理，如果是 100-200元/时 --> 最低 100元/时 最高 200元/时
# 对“日薪”进行处理，如果是 100-200元/天 --> 最低 100元/天 最高 200元/天
# 对`薪资`字段进行预处理。要求：30-60K·15薪 --> 最低：30，最高：60 去掉 K 以及后面的15薪去掉
# 然后将处理后的数据存储到新的列中，列名分别为`salary_lower`和`salary_high`。
def convert_salary(salary):
    if '元/月' in salary:
        match = re.match(r'(\d+)-(\d+)元/月', salary)
        if match:
            lower = str(int(match.group(1))) + '元/月'
            upper = str(int(match.group(2))) + '元/月'
            return lower, upper
    elif '元/时' in salary:
        # 对“时薪”进行处理，如果是 100-200元/时 --> 最低 100元/时 最高 200元/时
        match = re.match(r'(\d+)-(\d+)元/时', salary)
        if match:
            # 要加上元/时的单位
            lower = str(match.group(1) + '元/时')
            upper = str(match.group(2) + '元/时')
            return lower, upper
    elif '元/天' in salary:
        # 对“日薪”进行处理，如果是 100-200元/天 --> 最低 100元/天 最高 200元/天
        match = re.match(r'(\d+)-(\d+)元/天', salary)
        if match:
            # 要加上元/天的单位
            lower = str(match.group(1) + '元/天')
            upper = str(match.group(2) + '元/天')
            return lower, upper
    elif 'K·' in salary:
        match = re.match(r'(\d+)-(\d+)K·\d+薪', salary)
        if match:
            lower = str(int(match.group(1)) * 1000) + '元/月'
            upper = str(int(match.group(2)) * 1000) + '元/月'
            return lower, upper
    return None, None


all_city_zp_salary_df = all_city_zp_df['job_salary_range'].apply(convert_salary)
all_city_zp_df['salary_lower'] = all_city_zp_salary_df.apply(lambda x: x[0])
all_city_zp_df['salary_high'] = all_city_zp_salary_df.apply(lambda x: x[1])
all_city_zp_df.head()


# 对`薪资`字段进行预处理。要求：30-60K·15薪 --> 最低：30，最高：60
# all_city_zp_salary_df = all_city_zp_df['job_salary_range'].str.split('K', expand=True)[0].str.split('-', expand=True)
# all_city_zp_salary_df = all_city_zp_salary_df.rename(columns={0: 'salary_lower', 1: 'salary_high'})

# 对 ’企业融资情况‘进行处理，如果是‘1000-9999人’这种格式的数据，则返回 "未融资”，列名为 job_finance
def fun_com_finance(x):
    if re.match(r'^\d+-\d+人$', x):
        return "未融资"
    elif re.match(r'^\d+人以上$', x):
        return "不需要融资"
    else:
        return x


all_city_zp_df['job_finance'] = all_city_zp_df['job_finance'].apply(lambda x: fun_com_finance(x))


# 对`工作经验`字段进行预处理。要求：经验不限/在校/应届 ：0，1-3年：1，3-5年：2，5-10年：3，10年以上:4
def fun_work_year(x):
    if x in "1-3年":
        return 1
    elif x in "3-5年":
        return 2
    elif x in "5-10年":
        return 3
    elif x in "10年以上":
        return 4
    else:
        return 0


all_city_zp_df['job_experience'] = all_city_zp_df['job_experience'].apply(lambda x: fun_work_year(x))


# 对`企业规模`字段进行预处理。要求：500人以下：0，500-999：1，1000-9999：2，10000人以上：3
def fun_com_size(x):
    if x in "500-999人":
        return 1
    elif x in "1000-9999人":
        return 2
    elif x in "10000人以上":
        return 3
    else:
        return 0


# 对`岗位福利`字段进行预处理。要求：将描述中的中文'，'（逗号）,替换成英文','（逗号）
all_city_zp_df['job_welfare'] = all_city_zp_df['job_welfare'].str.replace('，', ',')

# 合并所有数据集
clean_all_city_zp_df = pd.concat([all_city_zp_df, all_city_zp_salary_df, all_city_zp_area_df], axis=1)

# 删除冗余列
clean_all_city_zp_df.drop('job_location', axis=1, inplace=True)  # 删除原区域
clean_all_city_zp_df.drop('job_salary_range', axis=1, inplace=True)  # 删除原薪资
clean_all_city_zp_df.drop('create_time', axis=1, inplace=True)  # 删除原创建时间
clean_all_city_zp_df.drop('community', axis=1, inplace=True)  # 删除原社区(样本太少，删除)

# 添加采集日期 get_date
clean_all_city_zp_df['get_time'] = normal_time

# 对缺失值所在行进行清洗。
clean_all_city_zp_df.dropna(axis=0, how='any', inplace=True)
clean_all_city_zp_df.drop(axis=0,
                          index=clean_all_city_zp_df.loc[(clean_all_city_zp_df['job_welfare'] == 'None')].index,
                          inplace=True)

try:
    # 将处理后的数据保存到 MySQL 数据库
    sql_path = "mysql+pymysql://{}:{}@{}:{}/{}?charset={}".format(db_user, db_password, db_host, db_port, db_name,
                                                                  db_charset)
    engine = create_engine(sql_path)
    clean_all_city_zp_df.to_sql(db_ctable, con=engine, if_exists='replace')

    comments = {
        'category': '岗位类别',
        'sub_category': '岗位子类',
        'job_title': '岗位名称',
        'province': '省份',
        'city': '城市',
        'district': '区',
        'street': '街道',
        'job_company': '公司名称',
        'job_industry': '行业类型',
        'job_finance': '融资情况',
        'job_scale': '企业规模',
        'job_welfare': '企业福利',
        'job_experience': '工作经验',
        'job_education': '学历要求',
        'job_skills': '技能要求',
        'salary_lower': '最低薪资',
        'salary_high': '最高薪资',
        'get_time': '采集日期'
    }

    db = DBUtils()
    for column, comment in comments.items():
        db.modify_comment(db_ctable, column, comment)
    db.close()

    logging.info("Write to MySQL Successfully!")
    print("Write to MySQL Successfully!")
except Exception as e:
    logging.error("Failed to write to MySQL: {}".format(e))
    print("Failed to write to MySQL: {}".format(e))

# 导出为 csv 文件
out_csv_path = 'output_data/clean_{}.csv'.format(db_otable)
clean_all_city_zp_df.to_csv(out_csv_path, index=False, encoding=db_charset)
logging.info("Write to CSV Successfully!")
print("Write to CSV Successfully!")
