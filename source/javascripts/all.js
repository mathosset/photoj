//= require jquery
//= require swipebox
//= require bootstrap-sprockets
//= require_tree .

$(document).ready(function() {
  if ($('.jspane').length) {
    $('.jspane').each(function() {
      var $jspane = $(this);
      $jspane.find('.text').hide();
      $jspane.hover(function() {
        $jspane.find('.text').stop(true, true).fadeIn();
      }, function() {
        $jspane.find('.text').stop(true, true).fadeOut();
      });

    });
  }

  $('#btn-grid').click(function() {
    $("section div:nth-child(n)").removeClass("col-sm-12").addClass("col-xs-12 col-sm-4");
    $('#btn-grid').addClass('disabled');
    $('#btn-list').removeClass('disabled');
  });
  $('#btn-list').click(function() {
    $("section div:nth-child(n)").removeClass("col-xs-12 col-sm-4").addClass("col-sm-12");
    $('#btn-list').addClass('disabled');
    $('#btn-grid').removeClass('disabled');
  });

  $('#hide').click(function() {
    $('#unhide').removeClass('hide');
    // $('#btn-grid').removeClass('disabled');
  });


  ;( function( $ ) {
          $( '.swipebox' ).swipebox({
            hideBarsDelay : 900000, // delay before hiding bars on desktop
            loopAtEnd: true // true will return to the first image after the last image is
          });

  } )( jQuery );

  $('.carousel').carousel({
    interval: 6000,
    keyboard: true,
    wrap: true,
    items: 9
  })

// $(document).ready(function() {
//   if ( document.URL.contains("index") ) {
//     $(".navbar-transparent").css("background-color", "transparent");
//   }else{
//     $('.navbar-transparent').css('background-color', 'white');
//   };
//   end;
// });

  // if(window.location.href.indexOf("x") > -1)
  if ( window.location.pathname == '/' ) {
      document.getElementById("transparent").style.backgroundColor = "transparent";
      // document.getElementById("white").style.color = "white";
      $(".navbar-default .navbar-nav>li>a").css({"color":"white"});
      $(".navbar-default .navbar-brand").css({"color":"white"});
      $(".navbar-default .navbar-toggle .icon-bar").css({"background-color":"white"});
    }
});

// $("#contactForm").submit(function(event){
//     // cancels the form submission
//     event.preventDefault();
//     submitForm();
// });

// function submitForm(){
//     // Initiate Variables With Form Content
//     var name = $("#name").val();
//     var email = $("#email").val();
//     var message = $("#message").val();
 
//     $.ajax({
//         type: "POST",
//         url: "php/form-process.php",
//         data: "name=" + name + "&email=" + email + "&message=" + message,
//         success : function(text){
//             if (text == "success"){
//                 formSuccess();
//             }
//         }
//     });
// }
// function formSuccess(){
//     $( "#msgSubmit" ).removeClass( "hidden" );
// }