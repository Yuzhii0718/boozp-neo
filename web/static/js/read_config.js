$(document).ready(function () {
    $.ajax({
        url: '/get_json',
        type: 'GET',
        datatype: 'json',
        success: function (config) {
            let obj = JSON.parse(config);
            if (obj.status == 201) {
                this.error(xhr = obj);
                return
            }
            $(function () {
                    // console.log(obj.text)
                    $("#author").text(obj.data.author);
                    $("#date").text(obj.data.date);
                    $("#get_time").text(obj.data.get_time);
                    $("#version").text(obj.data.ver);
                    $("#description").text(obj.data.des);

                    // console
                    // console.log("Author:" + obj.data.author);
                    console.log("Version:" + obj.data.ver);
                }
            )
        }, error: function (xhr, type, errorThrown) {
            // alert(xhr.config)
            console.log('Ajax error!' + xhr.data);
        }
    })
})

let imageCiallo = [
	'	 ██████╗██╗ █████╗ ██╗     ██╗      ██████╗     ██╗    ',
	'	██╔════╝██║██╔══██╗██║     ██║     ██╔═══██╗    ██║    ',
	'	██║     ██║███████║██║     ██║     ██║   ██║    ██║    ',
	'	██║     ██║██╔══██║██║     ██║     ██║   ██║    ╚═╝    ',
	'	╚██████╗██║██║  ██║███████╗███████╗╚██████╔╝    ██╗    ',
	'	 ╚═════╝╚═╝╚═╝  ╚═╝╚══════╝╚══════╝ ╚═════╝     ╚═╝    ',
	'                     Ciallo~(∠・ω< )⌒★ !                ',
	'					        Yuzhii					      ',
];

console.log(imageCiallo.join('\n'));