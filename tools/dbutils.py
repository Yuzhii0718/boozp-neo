#!/usr/bin/python
# -*- coding:utf-8 -*-
# @author  : Yuzhii
# @time    : 2024/12/20 17:14
# @function: 连接数据库，封装了操作数据库的增删改查等常见操作函数
# @version : V2

import pymysql
import logging

from tools.configmanager import ConfigManager as cm

db_info = cm.database()


class DBUtils(object):
    _db_conn = None
    _db_cursor = None

    def __init__(self):
        self.db_name = db_info['db_name']
        self.db_host = db_info['host']
        self.db_port = db_info['port']
        self.db_user = db_info['user']
        self.db_password = db_info['password']
        self.db_charset = db_info['charset']
        self.db_otable = db_info['original_table']

    def connect(self, mode=None):
        """
        Connect to the database
        :param mode: connection mode
        :return:
        """
        try:
            if self._db_conn is None:
                if mode == 'init':
                    self._db_conn = pymysql.connect(
                        host=self.db_host,
                        user=self.db_user,
                        password=self.db_password,
                        port=self.db_port,
                        charset=self.db_charset
                    )
                else:
                    self._db_conn = pymysql.connect(
                        host=self.db_host,
                        user=self.db_user,
                        password=self.db_password,
                        db=self.db_name,
                        port=self.db_port,
                        charset=self.db_charset
                    )
                self._db_cursor = self._db_conn.cursor() # cursor
                self.cursor = self._db_conn.cursor(pymysql.cursors.DictCursor) # cursor with dict
        except Exception as e:
            logging.error(e)

    def init_table(self):
        db_name = self.db_name
        db_otable = self.db_otable
        self.connect('init')
        try:
            # Drop the database if it exists
            drop_db_sql = f"DROP DATABASE IF EXISTS {db_name}"
            # Create the database if it does not exist
            create_db_sql = f"CREATE DATABASE IF NOT EXISTS {db_name}"
            # Use the database
            use_db_sql = f"USE {db_name}"
            # Drop the table if it exists
            drop_table_sql = f"DROP TABLE IF EXISTS {db_name}.{db_otable}"
            # Create the table
            create_table_sql = f"""
            CREATE TABLE {db_name}.{db_otable} (
                category         VARCHAR(255) NULL COMMENT '一级分类',
                sub_category     VARCHAR(255) NULL COMMENT '二级分类',
                job_title        VARCHAR(255) NULL COMMENT '岗位名称',
                province         VARCHAR(100) NULL COMMENT '省份',
                job_location     VARCHAR(255) NULL COMMENT '工作位置',
                job_company      VARCHAR(255) NULL COMMENT '企业名称',
                job_industry     VARCHAR(255) NULL COMMENT '行业类型',
                job_finance      VARCHAR(255) NULL COMMENT '融资情况',
                job_scale        VARCHAR(255) NULL COMMENT '企业规模',
                job_welfare      VARCHAR(255) NULL COMMENT '企业福利',
                job_salary_range VARCHAR(255) NULL COMMENT '薪资范围',
                job_experience   VARCHAR(255) NULL COMMENT '工作年限',
                job_education    VARCHAR(255) NULL COMMENT '学历要求',
                job_skills       VARCHAR(255) NULL COMMENT '技能要求',
                create_time      VARCHAR(50)  NULL COMMENT '抓取时间'
            );
            """
            self._db_cursor.execute(drop_db_sql)
            self._db_cursor.execute(create_db_sql)
            self._db_cursor.execute(use_db_sql)
            self._db_cursor.execute(drop_table_sql)
            self._db_cursor.execute(create_table_sql)
            print("Table initialized successfully!")
        except Exception as e:
            print(f"Failed to initialize table: {e}")

    def get_one(self, sql_str, args=None):
        """
        Get one result
        :param sql_str:
        :param args:
        :return: result
        """
        self.connect()
        try:
            if self._db_conn is not None:
                self._db_cursor.execute(sql_str, args=args)
                result = self._db_cursor.fetchone()
                return result
            else:
                logging.error("Please check the database connection")
        except Exception as e:
            logging.error(e)

    def get_all(self, sql_str, args=None):
        """
        Get all results
        :param sql_str:
        :param args:
        :return:
        """
        self.connect()
        try:
            if self._db_conn is not None:
                self._db_cursor.execute(sql_str, args=args)
                result = self._db_cursor.fetchall()
                return result
            else:
                logging.error("Please check the database connection")
        except Exception as e:
            logging.error(e)

    def insert_data(self, sql, args=None):
        """
        Insert data
        :param sql:
        :param args:
        :return:
        """
        self.connect()
        self.cursor.execute(sql, args)
        self._db_conn.commit()
        return self.cursor.rowcount

    def modify_comment(self, table_name, column_name, comment):
        """
        Modify the comment
        :param table_name:
        :param column_name:
        :param comment:
        :return:
        """
        self.connect()
        sql = "ALTER TABLE {} MODIFY {} VARCHAR(255) COMMENT '{}'".format(table_name, column_name, comment)
        self.cursor.execute(sql)
        self._db_conn.commit()

    def close(self):
        """
        Close the database connection
        :return:
        """
        if self.cursor is None or self._db_conn is None:
            raise pymysql.Error("Already closed")
        if self.cursor:
            self.cursor.close()
            self.cursor = None
        if self._db_conn:
            self._db_conn.close()
            self._db_conn = None

    def __del__(self):
        """
        Destructor
        :return:
        """
        if self._db_conn is not None:
            self._db_cursor.close()
            self._db_conn.close()
