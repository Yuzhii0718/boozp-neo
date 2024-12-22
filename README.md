# boss-selenium and web-page

使用 python+selenium 完成对 boss 互联网相关岗位的数据爬取以及数据清洗，

并分析数据，生成图表仪表盘，显示于 web 页面。以及热力图。

在线演示：[BOSS直聘 互联网/AI 岗位分析可视化](https://yuzhii0718.eu.org/boozp-neo/)

数据分析建议：[数据分析建议](advices.md)

## Usage

1. Environment

    ```bash
    python -m venv .venv
    .\.venv\Scripts\activate # Depends on your OS
    pip install -r requirements.txt
    ```

    本人使用的环境：

    | 软件 | 版本 |
    | --- | --- |
    | python | 3.9.13 |
    | mysql | 8.3 |

3. Run

    ```bash
    python main.py
    ```
    
    > 初次使用需要先 init 数据库
    > 数据清洗如果选择 csv 方式（参考 [config](#config)），需要爬取的数据导出到 csv 文件，放在 `input_data` 目录下。
    > 清洗的数据会存入数据库，以及导出到 `output_data` 目录。

### config

- `config.json` 配置文件

修改其中参数，如数据库连接信息，爬虫参数，Server 参数，web 页面的一些信息等。

## Reference

- [bosszp](https://github.com/jhcoco/bosszp)
- [boss_selenium](https://github.com/jhcoco/bosszp-selenium)
