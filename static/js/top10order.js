let top10order = { "status": 200, "data": [{ "id": 1, "name": "华为", "num": 99 }, { "id": 2, "name": "腾讯", "num": 46 }, { "id": 3, "name": "华为技术有限公司", "num": 32 }, { "id": 4, "name": "百度", "num": 29 }, { "id": 5, "name": "阿里巴巴集团", "num": 24 }, { "id": 6, "name": "蚂蚁集团", "num": 22 }, { "id": 7, "name": "北京字节跳动", "num": 21 }, { "id": 8, "name": "快手", "num": 18 }, { "id": 9, "name": "字节跳动", "num": 17 }, { "id": 10, "name": "京东集团", "num": 16 }] };

$(function () {
    let obj = top10order;

    $("#J_TbData").empty();
    for (let i = 0; i < obj.data.length; i++) {
        //动态创建一个tr行标签,并且转换成jQuery对象
        let $trTemp = $("<tr></tr>");
        //往行里面追加 td单元格
        $trTemp.append("<td class='top10order'>" + obj.data[i].id + "</td>");
        $trTemp.append("<td class='top10order'>" + obj.data[i].name + "</td>");
        $trTemp.append("<td class='top10order'>" + obj.data[i].num + "</td>");
        // $("#J_TbData").append($trTemp);
        $trTemp.appendTo("#J_TbData");
    }
});
