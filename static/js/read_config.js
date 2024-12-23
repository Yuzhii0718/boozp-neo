let config = {
    "status": 200,
    "data": {
        "author": "Yuzhii",
        "date": "2024-12",
        "get_time": "2024-12-19",
        "ver": "v1.1.1",
        "des": "This is a sample configuration file."
    }
};

$(function () {
    let obj = config;

    $("#author").text(obj.data.author);
    $("#date").text(obj.data.date);
    $("#get_time").text(obj.data.get_time);
    $("#version").text(obj.data.ver);
    $("#description").text(obj.data.des);

    // console
    // console.log("Author:" + obj.data.author);
    console.log("Version:" + obj.data.ver);
});

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