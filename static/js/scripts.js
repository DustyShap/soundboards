$(document).ready(function(){


    //Search term input validation
    $("#search_term").keyup(function(){

        if ($(this).val().length >= 3){
            $("#bttn").prop('disabled', false).css('color','green');
        }

        if ($(this).val().length < 3){
            $("#bttn").prop('disabled', true).css('color','red');
        }
    });





    //Play audio contained within individual cell
    $(".cell").click(function(){

      if ($(this).find('audio').length) {
        var audio = $(this.children)[2];
        audio.play();
      } else {
        //Do nothing
      }

    });



    $(".search_result").on(
        mouseenter: function(){

        console.log('test');
        },
        mouseleave: function(){

        console.log('test2');
        }

    )
});  //End of document ready wrap


