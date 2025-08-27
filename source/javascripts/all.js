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

  // === Masonry (publications) ===
  var $grid = $('.masonry-grid');
  if ($grid.length) {
    $grid.imagesLoaded(function() {
      $grid.masonry({
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true
      });
    });
  }

  // === Galerie tirage (page template) ===
  if ($('.tirage-gallery').length) {

    // 1) Clic sur le carré de vignette => changer l’image principale
    $('.tirage-thumbs').on('click', '.thumb-wrapper', function(e) {
      e.preventDefault();
      e.stopPropagation();

      var $img = $(this).find('img.thumb');
      var largeUrl = $img.data('large');

      $('.tirage-main .main-image').attr('src', largeUrl);
      $('.tirage-main .main-lightbox').attr('href', largeUrl);

      $('.tirage-thumbs .thumb-wrapper').removeClass('active');
      $(this).addClass('active');

      return false;
    });

    // 2) Clic sur l’image principale => ouvrir une lightbox NAVIGABLE
    $('.main-lightbox').on('click', function(e) {
      e.preventDefault();

      var elements = [];
      $('.tirage-thumbs img.thumb').each(function() {
        elements.push({
          href: $(this).data('large'),
          type: 'image'
        });
      });

      var currentSrc = $('.tirage-main .main-image').attr('src');
      var startIndex = 0;
      for (var i = 0; i < elements.length; i++) {
        if (elements[i].href === currentSrc) { startIndex = i; break; }
      }

      var lightbox = GLightbox({ elements: elements });
      lightbox.openAt(startIndex);
    });
  }

  // 3) Pré-remplir le champ Message si on arrive avec ?tirage=xxx (page contact)
  const urlParams = new URLSearchParams(window.location.search);
  const tirage = urlParams.get('tirage');
  const versionLabel = urlParams.get('label');
  const versionPrice = urlParams.get('prix');

  if (tirage) {
    const messageField = document.getElementById('Message');
    if (messageField) {
      let message = "Bonjour,\n\n";
      message += "Je souhaite faire l'acquisition du tirage \"" + tirage + "\".\n";

      if (versionLabel && versionPrice) {
        message += "Version : " + versionLabel + " — " + versionPrice + "\n";
      }

      message += "\nMerci de me confirmer la disponibilité et les modalités de commande.\n\nCordialement,";

      messageField.value = message;
    }
  }

  // === Mettre à jour le lien du bouton Commander ===
  const commanderBtn = document.getElementById('commander-btn');
  if ($('#price-options').length && commanderBtn) {

    function updateCommanderUrl(radio) {
      const tirageName = document.querySelector('h1#upper').innerText;
      const versionLabel = radio.dataset.label || "";
      const versionPrice = radio.value || "";

      // Met à jour le prix affiché sous le H1
      $('#selected-price').text(versionPrice);

      // Met à jour le bouton Commander
      const newUrl = `/demande-de-contact.html?tirage=${encodeURIComponent(tirageName)}&label=${encodeURIComponent(versionLabel)}&prix=${encodeURIComponent(versionPrice)}`;
      commanderBtn.setAttribute('href', newUrl);
    }

    // 1) Initialiser avec la valeur par défaut (radio checked)
    const defaultRadio = document.querySelector('#price-options input[type="radio"]:checked');
    if (defaultRadio) {
      updateCommanderUrl(defaultRadio);
    }

    // 2) Mettre à jour au changement
    $('#price-options input[type="radio"]').on('change', function() {
      updateCommanderUrl(this);
    });
  }

});
