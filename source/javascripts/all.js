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
