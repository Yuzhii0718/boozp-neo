# boss-selenium and web-page

使用 python+selenium 完成对 boss 互联网相关岗位的数据爬取以及数据清洗，

并分析数据，生成图表仪表盘，显示于 web 页面。

在线演示：[BOSS直聘 互联网/AI 岗位分析可视化](https://yuzhii0718.eu.org/boozp-neo/)

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

2. Create Database

    数据库名、表名可以自行修改，参考 [config](#config)

    ```sql
    drop database if exists spider_db;
    create database if not exists spider_db;
        
    use spider_db;

    drop table if exists job_info;
    create table spider_db.job_info
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
    ```

3. Run

    ```bash
    python main.py
    ```

    > 数据清洗如果选择 csv 方式（参考 [config](#config)），需要爬取的数据导出到 csv 文件，放在 `input_data` 目录下。
    > 清洗的数据会存入数据库，以及导出到 `output_data` 目录。

### config

- `config.json` 配置文件

修改其中参数，如数据库连接信息，爬虫参数，Server 参数，web 页面的一些信息等。

## Reference

- [bosszp](https://github.com/jhcoco/bosszp)
- [boss_selenium](https://github.com/jhcoco/bosszp-selenium)
