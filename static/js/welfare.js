let welfare = { "status": 200, "data": "节日福利,定期体检,补充医疗保险,五险一金,缴纳五险,五险一金,定期体检,带薪年假,加班补助,股票期权,年终奖,通讯补贴,人体工学椅,餐补,年终奖,员工旅游,补充医疗保险,定期体检,餐补,五险一金,节日福利,零食下午茶,通讯补贴,带薪年假,交通补助,节日福利,零食下午茶,带薪年假,底薪加提成,意外险,五险一金,加班补助,带薪年假,股票期权,交通补助,餐补,年终奖,五险一金,定期体检,节日福利,零食下午茶,股票期权,交通补助,年终奖,零食下午茶,带薪年假,节日福利,餐补,全勤奖,团建聚餐,定期体检,免费工装,加班补助,通讯补贴,生日福利,五险一金,员工旅游,高温补贴,有无线网,五险一金,零食下午茶,年终奖,股票期权,员工旅游,节日福利,定期体检,带薪年假,节日福利,全勤奖,住房补贴,五险一金,零食下午茶,年终奖,无,股票期权,带薪年假,五险一金,加班补助,补充医疗保险,餐补,员工" };


$(function () {
    let obj = welfare;

    let data = obj.data.split(/[,\. ]+/g)
        .reduce(function (arr, word) {
            let obj = arr.find(function (obj) {
                return obj.name === word;
            });
            if (obj) {
                obj.weight += 1;
            } else {
                obj = {
                    name: word,
                    weight: 1
                };
                arr.push(obj);
            }
            return arr;
        }, []);
    Highcharts.chart('welfare', {
        chart: {
            backgroundColor: 'rgba(0,0,0,0)'
        },
        series: [{
            type: 'wordcloud',
            data: data
        }],
        title: {
            text: '企业福利词云图'
        }
    });

});