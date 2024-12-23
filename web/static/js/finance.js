$(document).ready(function () {
    $.ajax({
        url: '/get_com_finance',
        type: 'GET',
        datatype: 'json',
        timeout: 5000,//超时时间设置为5秒；
        success: function (data) {
            let obj = JSON.parse(data);
            if (obj.status == 201) {
                this.error(xhr = obj);
            }

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
        },
        error: function (xhr, type, errorThrown) {
            // alert(xhr.data);
            console.log('Ajax error!' + xhr.data);
        }
    });
});