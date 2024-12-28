#!/usr/bin/python
# -*- coding:utf-8 -*-
# @author  : Yuzhii
# @time    : 2024/12/19 17:02
# @function: 工具，用于获取配置文件中的配置信息
# @version : V1

import json


class ConfigManager:
    JSON_PATH = 'config.json'

    @staticmethod
    def get_config(section):
        """
        Get the configuration information in the configuration file
        :param section:
        :return:
        """
        with open(ConfigManager.JSON_PATH, 'r') as file:
            config = json.load(file)
            return config.get(section, {})

    @staticmethod
    def normal():
        return ConfigManager.get_config('normal')

    @staticmethod
    def database():
        return ConfigManager.get_config('database')

    @staticmethod
    def spider():
        return ConfigManager.get_config('spider')

    @staticmethod
    def cleaner():
        return ConfigManager.get_config('cleaner')

    @staticmethod
    def web():
        return ConfigManager.get_config('web_server')

    @staticmethod
    def show():
        return ConfigManager.get_config('web_show')
