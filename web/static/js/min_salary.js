$(document).ready(function () {
    $.ajax({
        url: '/get_min_salary',
        type: 'GET',
        datatype: 'json',
        timeout: 5000,//超时时间设置为5秒；
        success: function (data) {
            let obj = JSON.parse(data);
            if (obj.status == 201){
                this.error(xhr=obj)
                return
            }
            let d = new Date(),str = '';
            str += d.getFullYear() + '年'; //获取当前年份
            str += d.getMonth() + 1 + '月'; //获取当前月份（0——11）

            // Filter out None values
            let filteredData = obj.data.filter(function(item) {
                return item !== null;
            });

            let chart = Highcharts.chart('min_salary', {
                chart: {
                    type: 'column',
                    backgroundColor: 'rgba(0,0,0,0)'
                },
                title: {
                    text: '最低薪资统计'
                },
                subtitle: {
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
                    data: filteredData,
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
            alert(xhr.data)
        }
    });
});$(document).ready(function () {
    $.ajax({
        url: '/get_min_salary',
        type: 'GET',
        datatype: 'json',
        success: function (data) {
            let obj = JSON.parse(data);
            if (obj.status == 201){
                this.error(xhr=obj)
                return
            }
            let d = new Date(),str = '';
            str += d.getFullYear() + '年'; //获取当前年份
            str += d.getMonth() + 1 + '月'; //获取当前月份（0——11）

            // Filter out None values
            let filteredData = obj.data.filter(function(item) {
                return item !== null;
            });

            let chart = Highcharts.chart('min_salary', {
                chart: {
                    type: 'column',
                    backgroundColor: 'rgba(0,0,0,0)'
                },
                title: {
                    text: '最低薪资统计'
                },
                subtitle: {
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
                    data: filteredData,
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