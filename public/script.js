$(document).ready(function () {
    $('.send').on("click", send)
    $('.start').on('click', start)


});


function send() {
    let from = $('input[name=from]').val()
    let to = $('input[name=to]').val()
    let msg = $('input[name=msg]').val()
    var info = {
        from: from,
        to: to,
        msg: msg,
    }
    console.log(info)

    $.post('/msg', info, function (data) {
        console.log(data);
        start();

    });

}
var loop

function start() {
    let from = $('input[name=from]').val()
    let to = $('input[name=to]').val()
    url = `http://localhost:3000/start?from=${from}&to=${to}`

    $.get(url, function (data) {
        $('.messages').empty();

        $(data).each(function (i) {
            if (data[i].userid == from) {
                $(".messages").append(`<div style="text-align:left; padding:10px; margin-bottom:10px;"><p><span style="background-color:lightgreen;">${data[i].sender}</span></p><p>${data[i].content}</p></div>`)

            } else {
                $(".messages").append(`<div style="text-align:right; padding:10px; margin-bottom:10px;"><p><span style="background-color:lightsalmon">${data[i].sender}</span></p><p>${data[i].content}</p></div>`)

            }
           
        });
        clearInterval(loop)

        loop = setInterval(start, 2000)
        scroll();
    });


}


function scroll(){     
    var height=$('.messages').scrollTop()
    // console.log("mouse height ", height)
    // console.log($('.messages')[0].scrollHeight)
    if ((($('.messages')[0].scrollHeight)-360) <= (height)){
        // console.log("yey")
        // $('.messages').scrollTop(height);
        $('.messages').scrollTop($('.messages')[0].scrollHeight);
    }else if(height==0){
        $('.messages').scrollTop($('.messages')[0].scrollHeight);

    }


}