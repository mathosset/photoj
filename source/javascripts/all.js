//= require_tree .

$(document).ready(function() {

  // JSPane hover effect
  if ($('.jspane').length) {
    $('.jspane').each(function() {
      var $jspane = $(this);
      $jspane.find('.text').hide();
      $jspane.hover(
        function() { $jspane.find('.text').stop(true, true).fadeIn(); },
        function() { $jspane.find('.text').stop(true, true).fadeOut(); }
      );
    });
  }

  // Grid/List toggle
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

  // Unhide button
  $('#hide').click(function() {
    $('#unhide').removeClass('hide');
  });

  // Bootstrap carousel
  $('.carousel').carousel({
    interval: 6000,
    keyboard: true,
    wrap: true,
    items: 9
  });

  // Navbar color for homepage
  if (window.location.pathname === '/') {
    $("#transparent").css("background-color", "transparent");
    $(".navbar-default .navbar-nav>li>a").css("color", "white");
    $(".navbar-default .navbar-brand").css("color", "white");
    $(".navbar-default .navbar-toggle .icon-bar").css("background-color", "white");
  }

});

$(document).ready(function() {
  $('.masonry-grid').masonry({
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    percentPosition: true
  });
});

