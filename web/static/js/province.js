$(document).ready(function () {
    $.ajax({
        url: '/get_province',
        type: 'GET',
        datatype: 'json',
        timeout: 5000,//超时时间设置为5秒；
        success: function (data) {
            var obj = JSON.parse(data);
            if (obj.status == 201){
                this.error(xhr=obj)
                return
            }
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
        },
        error: function (xhr, type, errorThrown) {
            // alert(xhr.data)
            console.log('Ajax error!' + xhr.data);
        }
    });
});