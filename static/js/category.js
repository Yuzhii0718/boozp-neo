const config = { "status": 200, "data": [["\u676d\u5dde", 250], ["\u5357\u4eac", 108], ["\u4e0a\u6d77", 419], ["\u60e0\u5dde", 29], ["\u6d77\u53e3", 17], ["\u5e7f\u5dde", 168], ["\u5408\u80a5", 80], ["\u6210\u90fd", 154], ["\u6df1\u5733", 439], ["\u5317\u4eac", 648], ["\u897f\u5b89", 149], ["\u957f\u6c99", 94], ["\u6b66\u6c49", 171], ["\u82cf\u5dde", 86], ["\u53a6\u95e8", 54], ["\u6606\u660e", 21], ["\u4e1c\u839e", 73], ["\u5357\u660c", 28], ["\u77f3\u5bb6\u5e84", 24], ["\u91cd\u5e86", 50], ["\u5927\u8fde", 36], ["\u90d1\u5dde", 77], ["\u70df\u53f0", 17], ["\u65e0\u9521", 44], ["\u5b81\u6ce2", 39], ["\u4f5b\u5c71", 29], ["\u5929\u6d25", 34], ["\u9752\u5c9b", 46], ["\u5e38\u5dde", 19], ["\u4e2d\u5c71", 19], ["\u6e29\u5dde", 17], ["\u5609\u5174", 17], ["\u6d4e\u5357", 45], ["\u73e0\u6d77", 38], ["\u798f\u5dde", 33], ["\u592a\u539f", 28], ["\u5357\u5b81", 16], ["\u6c88\u9633", 20], ["\u829c\u6e56", 17]] }

$(function () {
    const obj = config;

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
            text: '来源: <a href="https://zhipin.com">Boss直聘</a>'
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
            data: obj.data,
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
