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

//= $(document).ready(function() {
  //= $('#btn-grid').click(function() {
  //=  $("#grid").removeClass("col-sm-12").addClass("col-sm-4");
  //= });
//= });
