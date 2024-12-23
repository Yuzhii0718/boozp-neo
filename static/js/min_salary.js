let min_salary = { "status": 200, "data": [["20000元/月", 199], ["15000元/月", 175], ["18000元/月", 46], ["10000元/月", 77], ["30000元/月", 138], ["25000元/月", 119], ["14000元/月", 24], ["8000元/月", 74], ["13000元/月", 36], ["200元/天", 30], ["7000元/月", 31], ["12000元/月", 80], ["5000元/月", 43], ["6000元/月", 46], ["100元/天", 34], ["150元/天", 36], ["35000元/月", 33], ["300元/天", 11], ["16000元/月", 18], ["40000元/月", 44], ["11000元/月", 29], ["50000元/月", 15], ["9000元/月", 23], ["4000元/月", 13], ["120元/天", 11]] };

$(function () {
    let obj = min_salary;

    let d = new Date(), str = '';
    str += d.getFullYear() + '年'; //获取当前年份
    str += d.getMonth() + 1 + '月'; //获取当前月份（0——11）

    // Filter out None values
    let filteredData = obj.data.filter(function (item) {
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
});
