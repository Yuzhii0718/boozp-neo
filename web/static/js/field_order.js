$(document).ready(function () {
    $.ajax({
        url: '/get_field_order',
        type: 'GET',
        datatype: 'json',
        timeout: 5000,//超时时间设置为5秒；
        success: function (data) {
            let obj = JSON.parse(data);
            if (obj.status == 201){
                this.error(xhr=obj);
                return
            }
            $(function () {
                // let obj1 = JSON.parse(data);
                $("#J_TbData_field").empty();
                for (let i = 0; i < obj.data.length; i++) {
                    //动态创建一个tr行标签,并且转换成jQuery对象
                    let $trTemp = $("<tr></tr>");
                    //往行里面追加 td单元格
                    $trTemp.append("<td class='field_order'>" + obj.data[i].id + "</td>");
                    $trTemp.append("<td class='field_order'>" + obj.data[i].name + "</td>");
                    $trTemp.append("<td class='field_order'>" + obj.data[i].num + "</td>");
                    // $("#J_TbData").append($trTemp);
                    $trTemp.appendTo("#J_TbData_field");
                }
            });
        }, error: function (xhr, type, errorThrown) {
            // alert(xhr.data)
            console.log('Ajax error!' + xhr.data);
        }
    })
})