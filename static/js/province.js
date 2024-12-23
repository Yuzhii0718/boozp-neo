let province = { "status": 200, "data": [["浙江", 364], ["江苏", 312], ["上海", 419], ["广东", 819], ["安徽", 113], ["四川", 172], ["北京", 648], ["陕西", 155], ["湖南", 113], ["湖北", 189], ["福建", 115], ["云南", 24], ["黑龙江", 21], ["山东", 184], ["江西", 41], ["广西", 28], ["河北", 72], ["重庆", 50], ["山西", 45], ["辽宁", 63], ["河南", 109], ["内蒙古", 28], ["天津", 34]] };

$(function () {
    let obj = province;

    Highcharts.chart('province', {
        chart: {
            type: 'packedbubble',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0)'
        },
        title: {
            text: '热门岗位招聘省份分布'
        },
        tooltip: {
            useHTML: true,
            pointFormat: '<b>{point.name}:</b> {point.value}'
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
                        property: 'value',
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
        series: [{
            name: '省份',
            data: obj.data
        }]
    });

});