#!/usr/bin/python
# -*- coding:utf-8 -*-
# @author  : Yuzhii
# @time    : 2024/12/19 17:02
# @function: 工具，用于获取配置文件中的配置信息
# @version : V1

import json

JSON_PATH = 'config.json'


def get_config(section):
    with open(JSON_PATH, 'r') as file:
        config = json.load(file)
        return config.get(section, {})


def get_normal():
    return get_config('normal')


def get_db_config():
    return get_config('database')

def get_spider():
    return get_config('spider')


def get_cleaner():
    return get_config('cleaner')


def get_web():
    return get_config('web_server')

def get_show():
    return get_config('web_show')


if __name__ == "__main__":
    config = get_db_config()
    print("user:", config['user'])
    print("db_name:", config['db_name'])
    print("original_table:", config['original_table'])
