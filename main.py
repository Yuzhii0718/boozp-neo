import os
import pymysql

from tools.get_config import get_db_config

db_info = get_db_config()
db_user = db_info['user']
db_password = db_info['password']
db_name = db_info['db_name']
db_host = db_info['host']
db_port = db_info['port']
db_charset = db_info['charset']
db_otable = db_info['original_table']

def init_db():
    sql_statements = """
    drop database if exists {db_name};
    create database if not exists {db_name};
    
    use {db_name};

    drop table if exists {db_otable};
    create table {db_name}.{db_otable}
    (
        category         varchar(255) null comment '一级分类',
        sub_category     varchar(255) null comment '二级分类',
        job_title        varchar(255) null comment '岗位名称',
        province         varchar(100) null comment '省份',
        job_location     varchar(255) null comment '工作位置',
        job_company      varchar(255) null comment '企业名称',
        job_industry     varchar(255) null comment '行业类型',
        job_finance      varchar(255) null comment '融资情况',
        job_scale        varchar(255) null comment '企业规模',
        job_welfare      varchar(255) null comment '企业福利',
        job_salary_range varchar(255) null comment '薪资范围',
        job_experience   varchar(255) null comment '工作年限',
        job_education    varchar(255) null comment '学历要求',
        job_skills       varchar(255) null comment '技能要求',
        create_time      varchar(50)  null comment '抓取时间'
    );
    """.format(db_name=db_name, db_otable=db_otable)

    try:
        connection = pymysql.connect(
            host=db_host,
            user=db_user,
            password=db_password,
            charset=db_charset,
            port=db_port
        )
        cursor = connection.cursor()
        for statement in sql_statements.split(';'):
            if statement.strip():
                cursor.execute(statement)
        connection.commit()
        print("Database initialized successfully!")
    except Exception as e:
        print(f"Failed to initialize database: {e}")
    finally:
        cursor.close()
        connection.close()


def main():
    print("Select an option:")
    print("1. Run spider")
    print("2. Run data cleaner")
    print("3. Run web")

    choice = input("Enter your choice (1/2/3): ")

    if choice == '1':
        os.system('python ./spider/boss_selenium.py')
    elif choice == '2':
        os.system('python ./clean/dataclean.py')
    elif choice == '3':
        os.system('python ./web/runweb.py')
    elif choice == 'init':
        init_db()
    else:
        print("Invalid choice. Please enter 1, 2, or 3.")


if __name__ == '__main__':
    main()
