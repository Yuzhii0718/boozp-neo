$(document).ready(function () {
    $.ajax({
        url: '/get_job_num',
        type: 'GET',
        datatype: 'json',
        timeout: 5000,//超时时间设置为5秒；

        success: function (data) {
            var obj2 = JSON.parse(data);
            if (obj2.status == 201) {
                this.error(xhr = obj2)
                return
            }
            var d = new Date(), str = '';
            str += d.getFullYear() + '年'; //获取当前年份
            str += d.getMonth() + 1 + '月'; //获取当前月份（0——11）
            var chart = Highcharts.chart('city', {
                chart: {
                    type: 'column',
                    backgroundColor: 'rgba(0,0,0,0)'
                },
                title: {
                    text: '全国各大城市岗位数量'
                },
                subtitle: {
                    // text: '数据截止 '+str+'，来源: <a href="https://zhipin.com">Boss直聘</a>'
                    text: '来源: <a href="https://zhipin.com" style="color: white">Boss直聘</a>'
                },
                xAxis: {
                    type: 'category',
                    labels: {
                        rotation: -45  // 设置轴标签旋转角度
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: '岗位数 (个)'
                    }
                },
                legend: {
                    enabled: false
                },
                tooltip: {
                    pointFormat: '岗位总量: <b>{point.y} 个</b>'
                },
                series: [{
                    name: '总岗位数',
                    data: obj2.data,
                    dataLabels: {
                        enabled: true,
                        rotation: -90,
                        color: '#FFFFFF',
                        align: 'right',
                        format: '{point.y}', // :.1f 为保留 1 位小数
                        y: 10
                    }
                }]
            });
        },
        error: function (xhr, type, errorThrown) {
            // alert(xhr.data)
            console.log('Ajax error!' + xhr.data);
        }
    });
});