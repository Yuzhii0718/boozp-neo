$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "/get_word_cloud",
        // data: "name=John&location=Boston",
        timeout: 5000,//超时时间设置为5秒；
        success: function (msg) {
            let obj = JSON.parse(msg)
            if (obj.status == 201) {
                this.erro(xhr = let)
                return
            }
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
        },
        error: function (xhr, type, errorThrown) {
            // alert(xhr.data)
            console.log('Ajax error!' + xhr.data);
        }
    });
});
