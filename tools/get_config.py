#!/usr/bin/python
# -*- coding:utf-8 -*-
# @author  : Yuzhii
# @time    : 2024/12/19 17:02
# @function: 工具，用于获取配置文件中的配置信息
# @version : V1

import json

def get_normal(file_path):
    with open(file_path, 'r') as file:
        config = json.load(file)
        normal = config.get('normal', {})
    return normal

def get_db_config(file_path):
    with open(file_path, 'r') as file:
        config = json.load(file)
        db_config = config.get('database', {})
    return db_config

def get_browser(file_path):
    with open(file_path, 'r') as file:
        config = json.load(file)
        browser_config = config.get('browser', {})
    return browser_config

if __name__ == "__main__":
    config = get_db_config('../config.json')
    print("user:", config['user'])
    print("db_name:", config['db_name'])
    print("original_table:", config['original_table'])
