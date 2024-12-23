let finance = { "status": 200, "data": [{ "name": "B轮", "y": 3.39 }, { "name": "不需要融资", "y": 24.92 }, { "name": "已上市", "y": 14.07 }, { "name": "未融资", "y": 44.06 }, { "name": "天使轮", "y": 4.13 }, { "name": "A轮", "y": 4.38 }, { "name": "D轮及以上", "y": 3.25 }, { "name": "C轮", "y": 1.79 }] };

$(function () {
    let obj = finance;

    let processedData = [];
    let othersPercentage = 0;

    obj.data.forEach(function (item) {
        if (item[1] < 1) {
            othersPercentage += item[1];
        } else {
            processedData.push(item);
        }
    });

    if (othersPercentage > 0) {
        processedData.push(['Others', othersPercentage]);
    }

    let chart = Highcharts.chart('finance', {
        chart: {
            backgroundColor: 'rgba(0,0,0,0)'
        },
        title: {
            text: '金融<br>占比',
            align: 'center',
            verticalAlign: 'middle',
            y: 50
        },
        tooltip: {
            headerFormat: '{series.name}<br>',
            pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    distance: -50,
                    style: {
                        fontWeight: 'bold',
                        color: 'white',
                        textShadow: '0px 1px 2px black'
                    }
                },
                startAngle: -90, // 圆环的开始角度
                endAngle: 90,    // 圆环的结束角度
                center: ['50%', '75%']
            }
        },
        series: [{
            type: 'pie',
            name: '金融占比',
            innerSize: '50%',
            data: processedData
        }]
    });
});
