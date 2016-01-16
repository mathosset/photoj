//= require jquery
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
});

$(document).ready(function() {
  $('#btn-grid').click(function() {
    $("section div:nth-child(n)").removeClass("col-sm-12").addClass("col-xs-6 col-sm-4");
    $('#btn-grid').addClass('disabled');
    $('#btn-list').removeClass('disabled');
  });
  $('#btn-list').click(function() {
    $("section div:nth-child(n)").removeClass("col-xs-6 col-sm-4").addClass("col-sm-12");
    $('#btn-list').addClass('disabled');
    $('#btn-grid').removeClass('disabled');
  });
});
