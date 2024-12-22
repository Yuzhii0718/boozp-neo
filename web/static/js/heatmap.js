$(document).ready(function () {
    $.ajax({
        url: '/get_heatmap',
        type: 'GET',
        datatype: 'json',
        timeout: 5000, // Timeout set to 5 seconds
        success: function (data) {
            const obj = JSON.parse(data);
            if (obj.status == 201) {
                this.error(xhr = obj);
                return
            }
            $(function () {
                    var event = new CustomEvent('heatmapDataReady', {detail: obj.data});
                    document.dispatchEvent(event);
                    // 打印数据
                    console.log(obj.data);
                }
            )
        }, error: function (xhr, type, errorThrown) {
            // alert(xhr.config)
            console.log('Ajax error!' + xhr.data);
        }
    })
})