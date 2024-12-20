#!/usr/bin/python
# -*- coding:utf-8 -*-
# @author  : Yuzhii
# @time    : 2024/12/20 17:14
# @function: 连接数据库，封装了操作数据库的增删改查等常见操作函数
# @version : V2

import pymysql
import logging

from tools.get_config import get_db_config

db_info = get_db_config()


class DBUtils(object):
    # 初始化连接对象和游标对象
    _db_conn = None
    _db_cursor = None

    """
        数据库工具类 初始化方法
        传入 host，user，password，db 进行数据库连接
    """

    def __init__(self):
        try:
            self._db_conn = pymysql.connect(
                host=db_info['host'],
                user=db_info['user'],
                password=db_info['password'],
                port=db_info['port'],
                db=db_info['db_name'],
                charset=db_info['charset']
            )
            self._db_cursor = self._db_conn.cursor()

            # 初始化操作，例如建立数据库连接等
            self.conn = pymysql.connect(
                host=db_info['host'],
                user=db_info['user'],
                password=db_info['password'],
                db=db_info['db_name'],
                port=db_info['port'],
                charset='utf8'
            )
            # 获取游标 pymysql.cursors.DictCursor 指定返回值类型为 字典 类型
            self.cursor = self.conn.cursor(pymysql.cursors.DictCursor)

        except Exception as e:
            logging.error(e)

    def get_one(self, sql_str, args=None):
        """
        查询单个结果，返回具体的数据内容
        :param sql_str: sql语句
        :param args: 参数列表
        :return: result
        """
        try:
            if self._db_conn is not None:
                self._db_cursor.execute(sql_str, args=args)
                result = self._db_cursor.fetchone()
                return result
            else:
                logging.error("请检查数据库连接")
        except Exception as e:
            logging.error(e)

    # 查询多个结果
    def get_all(self, sql_str, args=None):
        """
        查询多个结果，返回元组对象
        :param sql_str: sql 语句
        :param args: 参数列表
        :return: result
        """
        try:
            if self._db_conn is not None:
                self._db_cursor.execute(sql_str, args=args)
                result = self._db_cursor.fetchall()
                return result
            else:
                logging.error("请检查数据库连接")
        except Exception as e:
            logging.error(e)

    def insert_data(self, sql, args=None):
        """
        插入数据
        :param sql: 插入数据的 sql
        :param args: 参数，只能是元组或者列表
        :return: 返回受影响的行数
        """
        self.cursor.execute(sql, args)
        self.conn.commit()
        return self.cursor.rowcount

    def modify_comment(self, table_name, column_name, comment):
        """
        修改字段注释
        :param table_name: 表名
        :param column_name: 字段名
        :param comment: 注释
        :return: None
        """
        sql = "ALTER TABLE {} MODIFY {} VARCHAR(255) COMMENT '{}'".format(table_name, column_name, comment)
        self.cursor.execute(sql)
        self.conn.commit()

    def close(self):
        """
        关闭数据库连接
        """
        self.cursor.close()
        self.conn.close()

    def __del__(self):
        """
        程序运行结束后，会默认调用 __del__ 方法
        销毁对象
        """
        if self._db_conn is not None:
            self._db_cursor.close()
            self._db_conn.close()
