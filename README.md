# boss-selenium and web-page

使用 python+selenium 完成对 boss 互联网相关岗位的数据爬取

并分析数据，生成词云图，显示于 web 页面

## Usage

1. 环境准备

    ```bash
    python -m venv .venv
    .\.venv\Scripts\activate # 取决于你的操作系统
    pip install -r requirements.txt
    ```

    本人使用的环境：

    | 软件 | 版本 |
    | --- | --- |
    | python | 3.9.13 |
    | mysql | 8.3 |

2. 创建数据库和表

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

3. 运行

- selenium script

    ```bash
    python ./boss_selenium.py
    ```

- clean data

    你需要先将爬取的数据导出到 csv 文件（`job_info.csv`），放在同一个目录下（`clean`目录），然后运行

    ```bash
    python ./clean/cleandata.py
    ```

- web-page

    ```bash
    python ./web/runweb.py
    ```

## 参考代码

- [bosszp](https://github.com/jhcoco/bosszp)
- [boss_selenium](https://github.com/jhcoco/bosszp-selenium)
