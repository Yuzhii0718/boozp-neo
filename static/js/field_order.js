let field_order = { "status": 200, "data": [{ "id": 1, "name": "计算机软件", "num": 863 }, { "id": 2, "name": "互联网", "num": 813 }, { "id": 3, "name": "游戏", "num": 190 }, { "id": 4, "name": "智能硬件", "num": 189 }, { "id": 5, "name": "通信/网络设备", "num": 171 }, { "id": 6, "name": "电子商务", "num": 164 }, { "id": 7, "name": "计算机服务", "num": 142 }, { "id": 8, "name": "大数据", "num": 94 }, { "id": 9, "name": "信息安全", "num": 80 }, { "id": 10, "name": "电子/半导体/集成电路", "num": 72 }] };

$(function () {
    let obj = field_order;

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
