$(document).ready(function () {
    $.ajax({
        url: '/get_job_industry_num',
        dataType: 'json',//服务器返回json格式数据
        type: 'GET',//HTTP请求类型
        timeout: 5000,//超时时间设置为5秒；
        success: function (data) {
            // let obj = JSON.parse(data)
            if (data.status == 201){
                this.error(xhr=data)
                return
            }
            Highcharts.chart('industry', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie',
                    backgroundColor: 'rgba(0,0,0,0)'
                },
                title: {
                    text: '专业占比'
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
                    data: data.data,
                }],
            });

        },
        error: function (xhr, type, errorThrown) {
            // alert(xhr.data)
            console.log('Ajax error!' + xhr.data);
        }
    });
})