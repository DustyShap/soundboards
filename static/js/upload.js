$(document).ready(function(){

    $results = $("#results_container")

    $("#upload_button").click(function(){

         $("#search_container").css('display','none');
         $("#password_window").css('display','flex');
         $(".search_result").remove()


    });



    $("#password_cancel_button").click(function(){


    $("#password_window").css('display','none');
    $("#results_container").show();


    })

});