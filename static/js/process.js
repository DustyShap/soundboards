$(document).ready(function(){


    var $results = $("#results_container")
    var $result_object = $("#result_object")

     //Display header based on who's audio is selected
    $(".chooser_button").click(function(){
        $("#no_results").hide()
        $(".header_image").removeAttr('id');
        $(".chooser_button").removeClass('button_chose');
        if ($(this).text() == 'Mike Lee'){
            $(this).addClass('button_chose');
            $("#search_container").css('display','none');
            $(".header_image").attr('src', "../static/img/mikelee.jpg");
            $(".header_image").attr('id','mike lee');
            submitData();
        } else if ($(this).text() == 'Doug Vaughn'){
            $(this).addClass('button_chose');
            $("#search_container").css('display','none');
            $(".header_image").attr('src', "../static/img/vaughn.jpg");
            $(".header_image").attr('id','doug');
            submitData();
        } else if ($(this).text() == 'The Plow Boy'){
            $(this).addClass('button_chose');
            $("#search_container").css('display','none');
            $(".header_image").attr('src', "../static/img/plowboy.jpg");
            $(".header_image").attr('id','plowboy');
            submitData();
        } else if ($(this).text() == 'Larry Nickel'){
            $(this).addClass('button_chose');
            $("#search_container").css('display','none');
            $(".header_image").attr('src', "../static/img/larry.jpg");
            $(".header_image").attr('id','larry');
            submitData();
        } else if ($(this).text() == 'Tim McKernan'){
            $(this).addClass('button_chose');
            $("#search_container").css('display','none');
            $(".header_image").attr('src', "../static/img/tmck.jpg");
            $(".header_image").attr('id','tim');
            submitData();
        } else if ($(this).text() == 'Charlie Marlow'){
            $(this).addClass('button_chose');
            $("#search_container").css('display','none');
            $(".header_image").attr('src', "../static/img/soundboards.jpg");
            $(".header_image").attr('id','charlie');
            submitData();
        } else if ($(this).text() == "Jimmy 'The Cat' Hayes"){
            $(this).addClass('button_chose');
            $("#search_container").css('display','none');
            $(".header_image").attr('src', "../static/img/soundboards.jpg");
            $(".header_image").attr('id','cat');
            submitData();
        } else if ($(this).text() === 'Jay Jr'){
            $(this).addClass('button_chose');
            $("#search_container").css('display','none');
            $(".header_image").attr('src', "../static/img/soundboards.jpg");
            $(".header_image").attr('id','jay jr');
            submitData();
        }  else if ($(this).text() === '@ProdJoe'){
            $(this).addClass('button_chose');
            $("#search_container").css('display','none');
            $(".header_image").attr('src', "../static/img/soundboards.jpg");
            $(".header_image").attr('id','prodjoe');
            submitData();
        }  else if ($(this).text() === 'Timberfake'){
            $(this).addClass('button_chose');
            $("#search_container").css('display','none');
            $(".header_image").attr('src', "../static/img/soundboards.jpg");
            $(".header_image").attr('id','timberfake');
            submitData();
        } else if ($(this).text() == 'Search All Drops'){
            $(this).addClass('button_chose');
            $(".header_image").attr('src', "../static/img/soundboards.jpg");
            $(".header_image").attr('id','search_drops');
            $("#search_container").show().css('display','flex');
            $("#search_term").focus();
            $("#results_container").empty();
            $("#upload_window").hide()
            $("#password_window").hide()
            $("#results_container").show();
        }  else if ($(this).text() === 'Upload'){


        }



    });





    //Process data on button click

    $('#submit_button').on('click', function(event) {
        $("#no_results").hide()
        $(".header_image").attr('id','search_drops');
        if ($(".header_image").attr('id')){
            submitSearchData(event)
            $("#no_results").hide()

        }

    });


    //Process data if enter is pressed within search term input field
    $('#search_term').keypress(function(event) {
    // enter has keyCode = 13, change it if you want to use another button
    if (event.keyCode == 13) {
        if ($("#search_term").val().length < 3) {
            alert('Search must be at least 3 letters')
            } else {
                 $("#no_results").hide()
                $(".header_image").attr('id','search_drops');
                submitSearchData(event)

            }
         }
     });




    //Process Data if Search All Drops is Selected.  Queries database for just tags, not speaker
    function submitSearchData(event){

        $("#password_window").hide()
        $("#upload_window").hide()
        var chosen = $(".header_image").attr('id');
        $("#search_container").show().css('display','flex');
        $("#results_container").empty();
        $("#instructions").hide();
        $("#length_display").attr('display','none');
        $.ajax({
            data : {
                tags: $('#search_term').val(),
                chosen: chosen
            },
            type: 'POST',
            url: '/process'
        })

        .done(function(data){


        var results_length = data.filename.length;
        if (results_length < 1){
            $("#no_results").css('display','flex');
        }

        for (var i=0; i < results_length; i++){

            $results.show();

            var filename = data.filename[i].filename;
            var speaker = data.filename[i].speaker;
            var transcription = data.filename[i].transcription;
            var full_url = "../static/audio/" + filename;
            $result_object.clone().appendTo($("#results_container")).attr('id', 'result'+i).addClass("search_result");
            $("#result"+i).attr('draggable','True');
            $("#result"+i + " #speaker").text(speaker).css('color','black');
            $("#result"+i + " #transcription").text(transcription).css('color','black');
            $("#result"+i + " #src").attr('src', full_url);
            $("#result"+i + " #wav").attr('src', full_url);

            }

             $('.fa-play-circle').on('click', clickplay);
            $('.fa-pause-circle').on('click', clickpause);
            $('.search_result').hover(function(){
                $(this).children()[2].className = 'gripper_container gripper_hover'
                }, function(){
                $(this).children()[2].className = 'gripper_container';
            });


        });
    };










     //Function to submit Data to process endpoint when a name is clicked
     //


    function submitData(){

        $("#upload_window").hide()
        $("#password_window").hide()
        var chosen = $(".header_image").attr('id');
        $("#results_container").empty();
        $("#instructions").hide();
        $("#length_display").attr('display','none');


        $.ajax({
            data : {
                tags: $('#search_term').val(),
                chosen: chosen
            },
            type: 'POST',
            url: '/process'
        })


        .done(function(data){

            var results_length = data.filename.length;
            $("#length_div").attr('display','flex');
            $("#length_display").text('Number of Results: ' + results_length);




            if (results_length < 1){


                $("#results_container").empty();

            }

            for (var i=0; i < results_length; i++){


               $results.show();

               var filename = data.filename[i].filename;
               var speaker = data.filename[i].speaker;
               var transcription = data.filename[i].transcription;
               var search_term = $('#search_term').val()
               var full_url = "../static/audio/" + filename;
               $result_object.clone().appendTo($("#results_container")).attr('id', 'result'+i).addClass("search_result");
               $("#result"+i).attr('draggable','True');
               $("#result"+i + " #speaker").text(speaker).css('color','red').css('display','none');
               $("#result"+i + " #transcription").text(transcription).css('color','black');
               $("#result"+i + " #src").attr('src', full_url);
               $("#result"+i + " #wav").attr('src', full_url);

            }


            $('.fa-play-circle').on('click', clickplay);
            $('.fa-pause-circle').on('click', clickpause);

            $('.search_result').hover(function(){
                $(this).children()[2].className = 'gripper_container gripper_hover'
                }, function(){
                $(this).children()[2].className = 'gripper_container';
            });

        }); //Data done end






    } //END SUBMIT DATA FUNCTION

    function clickplay(e){
        $(this).parent().children()[2].play();
    }


    function clickpause(e){
        $(this).parent().children()[2].pause();
    }






});


