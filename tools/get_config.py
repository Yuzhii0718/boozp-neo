#!/usr/bin/python
# -*- coding:utf-8 -*-
# @author  : Yuzhii
# @time    : 2024/12/19 17:02
# @function: 工具，用于获取配置文件中的配置信息
# @version : V1

import json


def get_config(file_path, section):
    with open(file_path, 'r') as file:
        config = json.load(file)
        return config.get(section, {})


def get_normal(file_path):
    return get_config(file_path, 'normal')


def get_db_config(file_path):
    return get_config(file_path, 'database')


def get_browser(file_path):
    return get_config(file_path, 'browser')


def get_spider(file_path):
    return get_config(file_path, 'spider')


if __name__ == "__main__":
    config = get_db_config('../config.json')
    print("user:", config['user'])
    print("db_name:", config['db_name'])
    print("original_table:", config['original_table'])
