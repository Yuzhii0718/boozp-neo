let region = {"status": 200, "data": [{"name": "杭州", "data": [{"name": "西湖区", "value": 51}, {"name": "滨江区", "value": 70}, {"name": "余杭区", "value": 58}]}, {"name": "南京", "data": [{"name": "雨花台区", "value": 38}, {"name": "江宁区", "value": 23}]}, {"name": "上海", "data": [{"name": "静安区", "value": 23}, {"name": "闵行区", "value": 53}, {"name": "浦东新区", "value": 105}, {"name": "徐汇区", "value": 54}, {"name": "杨浦区", "value": 34}, {"name": "长宁区", "value": 25}]}, {"name": "合肥", "data": [{"name": "蜀山区", "value": 48}]}, {"name": "深圳", "data": [{"name": "南山区", "value": 186}, {"name": "龙岗区", "value": 68}, {"name": "宝安区", "value": 64}, {"name": "龙华区", "value": 35}, {"name": "福田区", "value": 37}]}, {"name": "北京", "data": [{"name": "海淀区", "value": 286}, {"name": "朝阳区", "value": 179}, {"name": "大兴区", "value": 29}, {"name": "无", "value": 27}, {"name": "昌平区", "value": 28}, {"name": "通州区", "value": 25}]}, {"name": "成都", "data": [{"name": "武侯区", "value": 81}]}, {"name": "广州", "data": [{"name": "天河区", "value": 65}, {"name": "黄埔区", "value": 25}, {"name": "番禺区", "value": 26}]}, {"name": "西安", "data": [{"name": "雁塔区", "value": 93}, {"name": "长安区", "value": 24}]}, {"name": "武汉", "data": [{"name": "江夏区", "value": 61}, {"name": "洪山区", "value": 65}]}, {"name": "大连", "data": [{"name": "甘井子区", "value": 23}]}, {"name": "郑州", "data": [{"name": "中原区", "value": 24}, {"name": "金水区", "value": 22}]}, {"name": "长沙", "data": [{"name": "岳麓区", "value": 44}]}, {"name": "珠海", "data": [{"name": "香洲区", "value": 35}]}, {"name": "东莞", "data": [{"name": "大朗镇", "value": 24}]}]};

$(function () {
    let obj = region;

    Highcharts.chart('region', {
        chart: {
            type: 'packedbubble',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0)'
        },
        title: {
            text: '热门岗位招聘区域分布'
        },
        tooltip: {
            useHTML: true,
            pointFormat: '<b>{point.name}:</b> {point.y}'
        },
        plotOptions: {
            packedbubble: {
                minSize: '30%',
                maxSize: '120%',
                zMin: 0,
                zMax: 1000,
                layoutAlgorithm: {
                    splitSeries: false,
                    gravitationalConstant: 0.02
                },
                dataLabels: {
                    enabled: true,
                    format: '{point.name}',
                    filter: {
                        property: 'y',
                        operator: '>=',
                        value: 5
                    },
                    style: {
                        color: 'black',
                        textOutline: 'none',
                        fontWeight: 'normal'
                    }
                }
            }
        },
        series:obj.data
    });

});
