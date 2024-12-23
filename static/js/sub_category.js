let sub_category = { "status": 200, "data": [{ "name": "Java", "y": 2.03 }, { "name": "C/C++", "y": 3.28 }, { "name": "PHP", "y": 2.83 }, { "name": "Python", "y": 1.41 }, { "name": "C#", "y": 2.12 }, { "name": ".NET", "y": 1.46 }, { "name": "Node.js", "y": 2.1 }, { "name": "语音/视频/图形开发", "y": 1.82 }, { "name": "GIS工程师", "y": 2.03 }, { "name": "区块链工程师", "y": 1.7 }, { "name": "全栈工程师", "y": 2.12 }, { "name": "其他后端开发", "y": 1.86 }, { "name": "前端开发工程师", "y": 2.12 }, { "name": "Android", "y": 2.12 }, { "name": "Golang", "y": 0.71 }, { "name": "iOS", "y": 1.41 }, { "name": "U3D", "y": 1.41 }, { "name": "UE4", "y": 1.41 }, { "name": "Cocos", "y": 1.41 }, { "name": "技术美术", "y": 0.85 }, { "name": "JavaScript", "y": 1.11 }, { "name": "鸿蒙开发工程师", "y": 1.63 }, { "name": "测试工程师", "y": 2.12 }, { "name": "软件测试", "y": 2.83 }, { "name": "自动化测试", "y": 2.12 }, { "name": "功能测试", "y": 2.12 }, { "name": "测试开发", "y": 2.12 }, { "name": "硬件测试", "y": 2.12 }, { "name": "游戏测试", "y": 2.12 }, { "name": "性能测试", "y": 1.27 }, { "name": "渗透测试", "y": 1.25 }, { "name": "测试经理", "y": 0.87 }, { "name": "运维工程师", "y": 1.41 }, { "name": "IT技术支持", "y": 1.41 }, { "name": "网络工程师", "y": 1.41 }, { "name": "网络安全", "y": 1.41 }, { "name": "系统工程师", "y": 0.71 }, { "name": "运维开发工程师", "y": 0.71 }, { "name": "系统管理员", "y": 0.71 }, { "name": "DBA", "y": 0.71 }, { "name": "电脑/打印机维修", "y": 0.71 }, { "name": "技术文档工程师", "y": 0.71 }, { "name": "图像算法", "y": 0.71 }, { "name": "自然语言处理算法", "y": 0.71 }, { "name": "大模型算法", "y": 0.71 }, { "name": "数据挖掘", "y": 1.41 }, { "name": "规控算法", "y": 0.71 }, { "name": "SLAM算法", "y": 0.71 }, { "name": "推荐算法", "y": 0.71 }, { "name": "搜索算法", "y": 0.71 }, { "name": "语音算法", "y": 0.71 }, { "name": "风控算法", "y": 0.71 }, { "name": "算法研究员", "y": 0.71 }, { "name": "算法工程师", "y": 1.41 }, { "name": "机器学习", "y": 0.71 }, { "name": "深度学习", "y": 1.98 }, { "name": "自动驾驶系统工程师", "y": 0.71 }, { "name": "数据标注/AI训练师", "y": 0.71 }, { "name": "售前技术支持", "y": 0.71 }, { "name": "售后技术支持", "y": 0.71 }, { "name": "客户成功", "y": 0.71 }, { "name": "数据分析师", "y": 0.71 }, { "name": "数据开发", "y": 0.71 }, { "name": "数据仓库", "y": 0.71 }, { "name": "ETL工程师", "y": 0.71 }, { "name": "数据架构师", "y": 0.71 }, { "name": "爬虫工程师", "y": 0.71 }, { "name": "数据采集", "y": 0.71 }, { "name": "数据治理", "y": 0.71 }, { "name": "项目经理/主管", "y": 0.71 }, { "name": "项目助理", "y": 0.71 }, { "name": "项目专员", "y": 0.71 }, { "name": "实施工程师", "y": 0.71 }, { "name": "实施顾问", "y": 0.71 }, { "name": "需求分析工程师", "y": 0.71 }, { "name": "硬件项目经理", "y": 0.71 }, { "name": "技术经理", "y": 0.71 }, { "name": "架构师", "y": 0.71 }, { "name": "技术总监", "y": 0.71 }, { "name": "CTO/CIO", "y": 0.71 }, { "name": "技术合伙人", "y": 0.71 }, { "name": "运维总监", "y": 0.71 }] };

$(function () {
    let obj = sub_category;

    Highcharts.chart('sub_category', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            backgroundColor: 'rgba(0,0,0,0)'
        },
        title: {
            text: '开发方向占比'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: obj.data,
        }],
    });
});
