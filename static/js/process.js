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
            $(this).addClass('button_chose');
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



});
