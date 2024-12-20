#!/usr/bin/python
# -*- coding:utf-8 -*-
# @author  : Yuzhii
# @time    : 2024/12/20 17:14
# @function: 连接数据库，封装了操作数据库的增删改查等常见操作函数
# @version : V2

import pymysql
import logging


class DBUtils(object):
    # 初始化连接对象和游标对象
    _db_conn = None
    _db_cursor = None

    """
        数据库工具类 初始化方法
        传入 host，user，password，db 进行数据库连接
    """

    def __init__(self, host, user, password, db, port=3306, charset='utf8'):
        try:
            self._db_conn = pymysql.connect(host=host, user=user, password=password, port=port, db=db, charset=charset)
            self._db_cursor = self._db_conn.cursor()

            # 初始化操作，例如建立数据库连接等
            self.conn = pymysql.connect(host=host, user=user, password=password, db=db, port=port, charset=charset)
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

    # 插入数据
    def insert(self, sql_str, args=None):
        """
        向数据库插入数据，返回影响行数（int）
        :param sql_str: sql 语句
        :param args: 参数列表
        :return: affect_rows
        """
        try:
            if self._db_conn is not None:
                affect_rows = self._db_cursor.execute(sql_str, args=args)
                self._db_conn.commit()
                return affect_rows
            else:
                logging.error("请检查数据库连接")
        except Exception as e:
            self._db_conn.rollback()
            logging.error(e)

    # 修改数据
    def modify(self, sql_str, args=None):
        """
        更新数据，返回影响行数（int）
        :param sql_str: sql 语句
        :param args: 参数列表
        :return: affect_rows
        """
        return self.insert(sql_str=sql_str, args=args)

    # 删除数据
    def delete(self, sql_str, args=None):
        """
        删除数据，返回影响行数（int）
        :param sql_str: sql 语句
        :param args: 参数列表
        :return: affect_rows
        """
        return self.insert(sql_str=sql_str, args=args)

    def select_all(self, sql, args=None):
        """
        查询所有数据
        :param sql: 查询数据的 sql
        :param args: 参数，只能是元组或者列表
        :return: 返回结果集
        """
        self.cursor.execute(sql, args)
        result = self.cursor.fetchall()
        return result

    def select_n(self, sql, n, args=None):
        """
        查询满足条件的前 n 条数据
        :param sql: 查询数据的 sql
        :param n: 查询的条数
        :param args: 参数，只能是元组或者列表
        :return: 返回结果集
        """
        self.cursor.execute(sql, args)
        result = self.cursor.fetchmany(n)
        return result

    def select_one(self, sql, args=None):
        """
        查询满足条件的第 1 条数据
        :param sql: 查询数据的 sql
        :param args: 参数，只能是元组或者列表
        :return: 返回结果集
        """
        self.cursor.execute(sql, args)
        result = self.cursor.fetchone()
        return result

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

    def update_data(self, sql, args=None):
        """
        更新数据
        :param sql: 更新数据的 sql
        :param args: 参数，只能是元组或者列表
        :return: 返回受影响的行数
        """
        self.cursor.execute(sql, args)
        self.conn.commit()
        return self.cursor.rowcount

    def delete_data(self, sql, args=None):
        """
        删除数据
        :param sql: 删除数据的 sql
        :param args: 参数，只能是元组或者列表
        :return: 返回受影响的行数
        """
        self.cursor.execute(sql, args)
        self.conn.commit()
        return self.cursor.rowcount

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
