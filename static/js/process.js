$(document).ready(function(){


    var $results = $("#results_container")
    var $result_object = $("#result_object")
    var url = '/static/audio/'

    //Display header based on who's audio is selected
    $(".chooser_button").click(function(){
        $("#no_results").hide()
        $(".header_image").removeAttr('id');
        $(".chooser_button").removeClass().addClass('chooser_button');

        if ($(this).text() == 'Mike Lee'){
            addClass($(this),'mikelee')
            removeSearch()
            $(".header_image").attr('src', "../static/img/mikelee.jpg");
            $(".header_image").attr('id','mike lee');
            submitData();
        } else if ($(this).text() == 'Doug Vaughn'){
            addClass($(this),'doug')
            removeSearch()
            $(".header_image").attr('src', "../static/img/vaughn.jpg");
            $(".header_image").attr('id','doug');
            submitData();
        } else if ($(this).text() == 'The Plow Boy'){
            addClass($(this),'plowboy')
            removeSearch()
            $(".header_image").attr('src', "../static/img/plowboy.jpg");
            $(".header_image").attr('id','plowboy');
            submitData();
        } else if ($(this).text() == 'Larry Nickel'){
            addClass($(this),'larry')
            removeSearch()
            $(".header_image").attr('src', "../static/img/larry.jpg");
            $(".header_image").attr('id','larry');
            submitData();
        } else if ($(this).text() == 'Tim McKernan'){
            addClass($(this),'tim')
            removeSearch()
            $(".header_image").attr('src', "../static/img/tmck.jpg");
            $(".header_image").attr('id','tim');
            submitData();
        } else if ($(this).text() == 'Charlie Marlow'){
            addClass($(this),'charlie')
            removeSearch()
            $(".header_image").attr('src', "../static/img/soundboards.jpg");
            $(".header_image").attr('id','charlie');
            submitData();
        } else if ($(this).text() == "Jimmy 'The Cat' Hayes"){
            addClass($(this),'cat');
            removeSearch()
            $(".header_image").attr('src', "../static/img/soundboards.jpg");
            $(".header_image").attr('id','cat');
            submitData();
        } else if ($(this).text() === 'Jay Jr'){
            addClass($(this),'jayjr');
            removeSearch()
            $(".header_image").attr('src', "../static/img/soundboards.jpg");
            $(".header_image").attr('id','jay jr');
            submitData();
        }  else if ($(this).text() === '@ProdJoe'){
            addClass($(this),'prodjoe');
            removeSearch()
            $(".header_image").attr('src', "../static/img/soundboards.jpg");
            $(".header_image").attr('id','prodjoe');
            submitData();
        }  else if ($(this).text() === 'Timberfake'){
            addClass($(this),'timberfake');
            removeSearch()
            $(".header_image").attr('src', "../static/img/soundboards.jpg");
            $(".header_image").attr('id','timberfake');
            submitData();
        } else if ($(this).text() == 'Search All Drops'){
            $(this).addClass('button_chose');
            $(".header_image").attr('src', "../static/img/soundboards.jpg");
            $(".header_image").attr('id','search_drops');
            $("#search_container").show().css('display','flex');
            $("#search_term").focus();
            $("#upload_window").hide()
            $("#password_window").hide()
            $("#results_container").show();
        }  else if ($(this).text() === 'Last 20 Added'){
            submitLastTwenty();
        }
    });


    //Process data if a speaker's name is clicked
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

     //Function to query the DB for the last 20 added drops
    function submitLastTwenty(event){
        $("#password_window").hide()
        $("#upload_window").hide()
        $("#search_container").css('display','none');
        $("#results_container").empty();
        var chosen = 'last_twenty'
        $.ajax({
            data: {
                tags: null,
                chosen: chosen
            },
            type: 'POST',
            url: '/process'
        })
        .done(function(data){
        processData(data)
        });
    };




    //Function that takes a searched value and queries the DB for associated tags
    function submitSearchData(event){


        $("#password_window").hide()
        $("#upload_window").hide()
        var chosen = $(".header_image").attr('id');
        // if the search drop button was clicked, the id of the header is search_drops
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
          processData(data);
        });
    };

     //Function to submit Data to process endpoint when a name is clicked
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
            processData(data);
        });
      }




    //This function takes data returned from the server (which is drops returned from a query)
    //and adds the information to a result object which is appended into the result container
    function processData(data){
      var search_method = data.search_method;
      var results_length = data.drops.length;
      if (results_length < 1){
          $("#results_container").empty();
          $("#no_results").show().css('display','flex');
      }
      for (var i=0; i < results_length; i++){
         $results.show();
         var filename = data.drops[i].filename;
         var speaker = data.drops[i].speaker;
         var transcription = data.drops[i].transcription;
         var full_url = "../static/audio/" + filename;
         $result_object.clone().appendTo($("#results_container")).attr('id', 'result'+i).addClass("search_result");
         $("#result"+i).attr('draggable','True');
         $("#result"+i + " #speaker").text(speaker).css('color','red');
         if (search_method == 'name'){
           $("#result"+i + " #speaker").text(speaker).css('color','red').css('display','none');
         }
         $("#result"+i + " #transcription").text(transcription).css('color','black');
         $("#result"+i + " #src").attr('src', full_url);
         $("#result"+i + " #wav").attr('src', full_url);
      }
      $('.fa-play-circle').on('click', clickplay);
      $('.fa-pause-circle').on('click', clickpause);
      $(".link_button").on('click', clicklink);
      $('.search_result').hover(function(){
          $(this).children()[2].className = 'gripper_container gripper_hover'
          }, function(){
          $(this).children()[2].className = 'gripper_container';
      });
    }


    //Function to handle play in a result object
    function clickplay(e){
        $(this).parent().children()[2].play();
        var filename = $(this).parent()[0].children[2].children[0].getAttribute('src').slice(16);
        var element = 'result'

        $.ajax({
            data : {
                filename: filename,
                element: element
            },
            type: 'POST',
            url: '/count'
        })
        .done(function(data){



        })

    }

    //Function to handle pause in a result object
    function clickpause(e){
        $(this).parent().children()[2].pause();
    }

    //Function to handle generating a link in a result object
    function clicklink(e){
        var filename =  $(this).parent().parent()[0].children[2].children[0].getAttribute('src').slice(16);
        full = url+filename;
        var a = $(this).parent()[0];
        a.setAttribute('href',full);
    }

    //Function to add the button_chose as well as the speaker name as classes
    function addClass($element,classtoAdd){
          $element.addClass(classtoAdd).addClass('button_chose')
  }

    //Function to remove the search bar
    function removeSearch(){
      $("#search_container").css('display','none');
    }

});
