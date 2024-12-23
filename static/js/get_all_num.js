let all_num = { "status": 200, "data": [4242] };

$(function () {
    let obj = all_num;
    let data = obj.data;

    $("#get_all_num").text(data);
});
