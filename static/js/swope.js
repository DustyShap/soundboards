$(document).ready(function(){

    var url = 'http://www.clipthatoff.com/static/audio/'
    $("#search_button").click(function(){
        $("#swopeobject").empty();
        var keyword = $("#keyword").val()
        $.ajax({
            data : {
                keyword: keyword

            },
            type: 'POST',
            url: '/swopeprocess'
        })
        .done(function(data){

        var results_length = data.keyword.length;
        for (var i=0; i < results_length; i++){
            var filename = data.keyword[i].filename
            var full_url = url + filename
            $("#swopeobject").clone().appendTo($("#swoperesults")).attr('id','testing'+i).css('display','flex');

            var thelink = $('<a>',{
                text: 'linktext',
                title: 'some title',
                href: 'somelink.html'
            }).appendTo('body');





        }

    })

    })









});