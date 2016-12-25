$(document).ready(function(){



    $("#upload_button").click(function(){

         $("#search_container").css('display','none');
         $("#password_window").css('display','flex');
         $(".search_result").remove()
         $("#password").focus();

    });


    $("#password_cancel_button").click(function(){
        $("#password_window").css('display','none');
        $("#results_container").show();
        $("#password").val('');




    })

    $("#password_button").click(function(){

        if ($("#password").val() === 'thinkaboutit'){
            $("#password_window").css('display','none');
            $("#search_container").css('display','none');
            $("#upload_window").css('display', 'flex');
            $("#upload_button").hide();
            $("#results_container").hide();
            $("#chooser_wrap").hide();
            $(".header_image").attr('src', "../static/img/soundboards.jpg");


        } else {

            console.log('Wrong PW Attempt');
            alert('Wrong Password');
            $("#password").val('');

        }


    })

    $("#upload_submit").click(function(e){



        var form_data = new FormData($("#upload_form")[0]);


        $.ajax({
            type: "POST",
            url: "/upload",
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            async: false,

           })

        .done(function(data){

            console.log(data);
            if (data.warning){

                alert('Please complete the form and ensure filetype is MP3/WAV');


            } else {


                $("#chooser_wrap").show();
                $("#upload_window").css('display', 'none');
                $("#upload_button").hide();
                console.log(data.file + ' uploaded');

            };

        });

        e.preventDefault();


    })

    $("#upload_cancel").click(function(){

        $("#upload_window").css('display', 'none');
        $("#chooser_wrap").show();
        $("#password_window").css('display','none');
        $("#results_container").show();
        $("#password").val('');
        $("#upload_button").show();
    })


});