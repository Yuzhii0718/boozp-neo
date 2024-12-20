$(document).ready(function () {
    $.ajax({
        url: '/getjson',
        type: 'GET',
        datatype: 'json',
        success: function (config) {
            const obj = JSON.parse(config);
            if (obj.status == 201) {
                this.error(xhr = obj);
                return
            }
            $(function () {
                console.log(obj)
                    $("#author").text(obj.data.author);
                    $("#date").text(obj.data.date);
                    $("#version").text(obj.data.ver);
                    $("#description").text(obj.data.des);
                }
            )
        }, error: function (xhr, type, errorThrown) {
            alert(xhr.config)
        }
    })
})