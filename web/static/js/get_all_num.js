$(document).ready(function () {
    $.ajax({
        url: '/get_all_num',
        type: 'GET',
        datatype: 'json',
        timeout: 5000, // Timeout set to 5 seconds
        success: function (data) {
            let obj = JSON.parse(data);
            if (obj.status == 201) {
                this.error(xhr = obj);
                return
            }
            $(function () {
                    let all_num = obj.data;
                    $("#get_all_num").text(all_num);
                }
            )
        }, error: function (xhr, type, errorThrown) {
            // alert(xhr.config)
            console.log('Ajax error!' + xhr.data);
        }
    })
})