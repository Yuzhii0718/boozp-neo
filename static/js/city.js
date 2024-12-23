let city = {"status": 200, "data": [["杭州", 250], ["南京", 108], ["上海", 419], ["惠州", 29], ["海口", 17], ["广州", 168], ["合肥", 80], ["成都", 154], ["深圳", 439], ["北京", 648], ["西安", 149], ["长沙", 94], ["武汉", 171], ["苏州", 86], ["厦门", 54], ["昆明", 21], ["东莞", 73], ["南昌", 28], ["石家庄", 24], ["重庆", 50], ["大连", 36], ["郑州", 77], ["烟台", 17], ["无锡", 44], ["宁波", 39], ["佛山", 29], ["天津", 34], ["青岛", 46], ["常州", 19], ["中山", 19], ["温州", 17], ["嘉兴", 17], ["济南", 45], ["珠海", 38], ["福州", 33], ["太原", 28], ["南宁", 16], ["沈阳", 20], ["芜湖", 17]]};

$(function () {
    let obj = city;

    let d = new Date(), str = '';
            str += d.getFullYear() + '年'; //获取当前年份
            str += d.getMonth() + 1 + '月'; //获取当前月份（0——11）
            let chart = Highcharts.chart('city', {
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
