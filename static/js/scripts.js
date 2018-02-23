$(document).ready(function() {

  //Search term input validation
  $("#search_term").keyup(function() {

    if ($(this).val().length >= 3) {
      $("#submit_button").prop('disabled', false).css('color', 'white').css('background-color', 'green');
    }

    if ($(this).val().length < 3) {
      $("#submit_button").prop('disabled', true).css('color', 'white').css('background-color', 'red');
    }
  });

  //Play audio contained within individual cell
  $(".cell").click(function() {

    if ($(this).find('audio').length) {
      var audio = $(this.children)[2];
      var filename = $(this).children()[2].getAttribute('src').slice(16);
      var element = 'cell';
      audio.play();

      $.ajax({
          data : {
              filename: filename,
              cell_clicked: true
          },
          type: 'POST',
          url: '/drop_stats'
      })

    }
  });
}); //End of document ready wrap
