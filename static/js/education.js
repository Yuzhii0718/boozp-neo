let education = {"status": 200, "data": [{"name": "本科", "y": 56.86}, {"name": "3个月", "y": 1.65}, {"name": "硕士", "y": 5.8}, {"name": "学历不限", "y": 9.17}, {"name": "大专", "y": 20.53}, {"name": "中专/中技", "y": 1.67}, {"name": "4个月", "y": 0.14}, {"name": "2个月", "y": 0.28}, {"name": "10个月", "y": 0.02}, {"name": "5个月", "y": 0.21}, {"name": "博士", "y": 0.73}, {"name": "1个月", "y": 0.26}, {"name": "6个月", "y": 1.25}, {"name": "高中", "y": 1.04}, {"name": "12个月", "y": 0.09}, {"name": "初中及以下", "y": 0.24}, {"name": "7个月", "y": 0.02}, {"name": "11个月", "y": 0.02}]};

$(function () {
    let obj = education;

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

            let chart = Highcharts.chart('education', {
                chart: {
                    backgroundColor: 'rgba(0,0,0,0)'
                },
                title: {
                    text: '学历<br>占比',
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
                    name: '学历占比',
                    innerSize: '50%',
                    data: processedData
                }]
            });

});
