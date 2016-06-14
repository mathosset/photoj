/*! Swipebox v1.4.4 | Constantin Saguin csag.co | MIT License | github.com/brutaldesign/swipebox */
!function(e,i,t,s){t.swipebox=function(o,a){var n,r,l={useCSS:!0,useSVG:!0,initialIndexOnArray:0,removeBarsOnMobile:!0,hideCloseButtonOnMobile:!1,hideBarsDelay:3e3,videoMaxWidth:1140,vimeoColor:"cccccc",beforeOpen:null,afterOpen:null,afterClose:null,afterMedia:null,nextSlide:null,prevSlide:null,loopAtEnd:!1,autoplayVideos:!1,queryStringData:{},toggleClassOnLoad:""},d=this,p=[],c=o.selector,b=navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(Android)|(PlayBook)|(BB10)|(BlackBerry)|(Opera Mini)|(IEMobile)|(webOS)|(MeeGo)/i),u=null!==b||i.createTouch!==s||"ontouchstart"in e||"onmsgesturechange"in e||navigator.msMaxTouchPoints,h=!!i.createElementNS&&!!i.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect,g=e.innerWidth?e.innerWidth:t(e).width(),w=e.innerHeight?e.innerHeight:t(e).height(),f=0,m='<div id="swipebox-overlay">					<div id="swipebox-container">						<div id="swipebox-slider"></div>						<div id="swipebox-top-bar">							<div id="swipebox-title"></div>						</div>						<div id="swipebox-bottom-bar">							<div id="swipebox-arrows">								<a id="swipebox-prev"></a>								<a id="swipebox-next"></a>							</div>						</div>						<a id="swipebox-close"></a>					</div>			</div>';d.settings={},t.swipebox.close=function(){n.closeSlide()},t.swipebox.extend=function(){return n},d.init=function(){d.settings=t.extend({},l,a),t.isArray(o)?(p=o,n.target=t(e),n.init(d.settings.initialIndexOnArray)):t(i).on("click",c,function(e){if("slide current"===e.target.parentNode.className)return!1;t.isArray(o)||(n.destroy(),r=t(c),n.actions()),p=[];var i,s,a;a||(s="data-rel",a=t(this).attr(s)),a||(s="rel",a=t(this).attr(s)),r=a&&""!==a&&"nofollow"!==a?t(c).filter("["+s+'="'+a+'"]'):t(c),r.each(function(){var e=null,i=null;t(this).attr("title")&&(e=t(this).attr("title")),t(this).attr("href")&&(i=t(this).attr("href")),p.push({href:i,title:e})}),i=r.index(t(this)),e.preventDefault(),e.stopPropagation(),n.target=t(e.target),n.init(i)})},n={init:function(e){d.settings.beforeOpen&&d.settings.beforeOpen(),this.target.trigger("swipebox-start"),t.swipebox.isOpen=!0,this.build(),this.openSlide(e),this.openMedia(e),this.preloadMedia(e+1),this.preloadMedia(e-1),d.settings.afterOpen&&d.settings.afterOpen(e)},build:function(){var e,i=this;t("body").append(m),h&&d.settings.useSVG===!0&&(e=t("#swipebox-close").css("background-image"),e=e.replace("png","svg"),t("#swipebox-prev, #swipebox-next, #swipebox-close").css({"background-image":e})),b&&d.settings.removeBarsOnMobile&&t("#swipebox-bottom-bar, #swipebox-top-bar").remove(),t.each(p,function(){t("#swipebox-slider").append('<div class="slide"></div>')}),i.setDim(),i.actions(),u&&i.gesture(),i.keyboard(),i.animBars(),i.resize()},setDim:function(){var i,s,o={};"onorientationchange"in e?e.addEventListener("orientationchange",function(){0===e.orientation?(i=g,s=w):(90===e.orientation||-90===e.orientation)&&(i=w,s=g)},!1):(i=e.innerWidth?e.innerWidth:t(e).width(),s=e.innerHeight?e.innerHeight:t(e).height()),o={width:i,height:s},t("#swipebox-overlay").css(o)},resize:function(){var i=this;t(e).resize(function(){i.setDim()}).resize()},supportTransition:function(){var e,t="transition WebkitTransition MozTransition OTransition msTransition KhtmlTransition".split(" ");for(e=0;e<t.length;e++)if(i.createElement("div").style[t[e]]!==s)return t[e];return!1},doCssTrans:function(){return d.settings.useCSS&&this.supportTransition()?!0:void 0},gesture:function(){var e,i,s,o,a,n,r=this,l=!1,d=!1,c=10,b=50,u={},h={},w=t("#swipebox-top-bar, #swipebox-bottom-bar"),m=t("#swipebox-slider");w.addClass("visible-bars"),r.setTimeout(),t("body").bind("touchstart",function(r){return t(this).addClass("touching"),e=t("#swipebox-slider .slide").index(t("#swipebox-slider .slide.current")),h=r.originalEvent.targetTouches[0],u.pageX=r.originalEvent.targetTouches[0].pageX,u.pageY=r.originalEvent.targetTouches[0].pageY,t("#swipebox-slider").css({"-webkit-transform":"translate3d("+f+"%, 0, 0)",transform:"translate3d("+f+"%, 0, 0)"}),t(".touching").bind("touchmove",function(r){if(r.preventDefault(),r.stopPropagation(),h=r.originalEvent.targetTouches[0],!d&&(a=s,s=h.pageY-u.pageY,Math.abs(s)>=b||l)){var w=.75-Math.abs(s)/m.height();m.css({top:s+"px"}),m.css({opacity:w}),l=!0}o=i,i=h.pageX-u.pageX,n=100*i/g,!d&&!l&&Math.abs(i)>=c&&(t("#swipebox-slider").css({"-webkit-transition":"",transition:""}),d=!0),d&&(i>0?0===e?t("#swipebox-overlay").addClass("leftSpringTouch"):(t("#swipebox-overlay").removeClass("leftSpringTouch").removeClass("rightSpringTouch"),t("#swipebox-slider").css({"-webkit-transform":"translate3d("+(f+n)+"%, 0, 0)",transform:"translate3d("+(f+n)+"%, 0, 0)"})):0>i&&(p.length===e+1?t("#swipebox-overlay").addClass("rightSpringTouch"):(t("#swipebox-overlay").removeClass("leftSpringTouch").removeClass("rightSpringTouch"),t("#swipebox-slider").css({"-webkit-transform":"translate3d("+(f+n)+"%, 0, 0)",transform:"translate3d("+(f+n)+"%, 0, 0)"}))))}),!1}).bind("touchend",function(e){if(e.preventDefault(),e.stopPropagation(),t("#swipebox-slider").css({"-webkit-transition":"-webkit-transform 0.4s ease",transition:"transform 0.4s ease"}),s=h.pageY-u.pageY,i=h.pageX-u.pageX,n=100*i/g,l)if(l=!1,Math.abs(s)>=2*b&&Math.abs(s)>Math.abs(a)){var p=s>0?m.height():-m.height();m.animate({top:p+"px",opacity:0},300,function(){r.closeSlide()})}else m.animate({top:0,opacity:1},300);else d?(d=!1,i>=c&&i>=o?r.getPrev():-c>=i&&o>=i&&r.getNext()):w.hasClass("visible-bars")?(r.clearTimeout(),r.hideBars()):(r.showBars(),r.setTimeout());t("#swipebox-slider").css({"-webkit-transform":"translate3d("+f+"%, 0, 0)",transform:"translate3d("+f+"%, 0, 0)"}),t("#swipebox-overlay").removeClass("leftSpringTouch").removeClass("rightSpringTouch"),t(".touching").off("touchmove").removeClass("touching")})},setTimeout:function(){if(d.settings.hideBarsDelay>0){var i=this;i.clearTimeout(),i.timeout=e.setTimeout(function(){i.hideBars()},d.settings.hideBarsDelay)}},clearTimeout:function(){e.clearTimeout(this.timeout),this.timeout=null},showBars:function(){var e=t("#swipebox-top-bar, #swipebox-bottom-bar");this.doCssTrans()?e.addClass("visible-bars"):(t("#swipebox-top-bar").animate({top:0},500),t("#swipebox-bottom-bar").animate({bottom:0},500),setTimeout(function(){e.addClass("visible-bars")},1e3))},hideBars:function(){var e=t("#swipebox-top-bar, #swipebox-bottom-bar");this.doCssTrans()?e.removeClass("visible-bars"):(t("#swipebox-top-bar").animate({top:"-50px"},500),t("#swipebox-bottom-bar").animate({bottom:"-50px"},500),setTimeout(function(){e.removeClass("visible-bars")},1e3))},animBars:function(){var e=this,i=t("#swipebox-top-bar, #swipebox-bottom-bar");i.addClass("visible-bars"),e.setTimeout(),t("#swipebox-slider").click(function(){i.hasClass("visible-bars")||(e.showBars(),e.setTimeout())}),t("#swipebox-bottom-bar").hover(function(){e.showBars(),i.addClass("visible-bars"),e.clearTimeout()},function(){d.settings.hideBarsDelay>0&&(i.removeClass("visible-bars"),e.setTimeout())})},keyboard:function(){var i=this;t(e).bind("keyup",function(e){e.preventDefault(),e.stopPropagation(),37===e.keyCode?i.getPrev():39===e.keyCode?i.getNext():27===e.keyCode&&i.closeSlide()})},actions:function(){var e=this,i="touchend click";p.length<2?(t("#swipebox-bottom-bar").hide(),s===p[1]&&t("#swipebox-top-bar").hide()):(t("#swipebox-prev").bind(i,function(i){i.preventDefault(),i.stopPropagation(),e.getPrev(),e.setTimeout()}),t("#swipebox-next").bind(i,function(i){i.preventDefault(),i.stopPropagation(),e.getNext(),e.setTimeout()})),t("#swipebox-close").bind(i,function(){e.closeSlide()})},setSlide:function(e,i){i=i||!1;var s=t("#swipebox-slider");f=100*-e,this.doCssTrans()?s.css({"-webkit-transform":"translate3d("+100*-e+"%, 0, 0)",transform:"translate3d("+100*-e+"%, 0, 0)"}):s.animate({left:100*-e+"%"}),t("#swipebox-slider .slide").removeClass("current"),t("#swipebox-slider .slide").eq(e).addClass("current"),this.setTitle(e),i&&s.fadeIn(),t("#swipebox-prev, #swipebox-next").removeClass("disabled"),0===e?t("#swipebox-prev").addClass("disabled"):e===p.length-1&&d.settings.loopAtEnd!==!0&&t("#swipebox-next").addClass("disabled")},openSlide:function(i){t("html").addClass("swipebox-html"),u?(t("html").addClass("swipebox-touch"),d.settings.hideCloseButtonOnMobile&&t("html").addClass("swipebox-no-close-button")):t("html").addClass("swipebox-no-touch"),t(e).trigger("resize"),this.setSlide(i,!0)},preloadMedia:function(e){var i=this,t=null;p[e]!==s&&(t=p[e].href),i.isVideo(t)?i.openMedia(e):setTimeout(function(){i.openMedia(e)},1e3)},openMedia:function(e){var i,o,a=this;return p[e]!==s&&(i=p[e].href),0>e||e>=p.length?!1:(o=t("#swipebox-slider .slide").eq(e),void(a.isVideo(i)?(o.html(a.getVideo(i)),d.settings.afterMedia&&d.settings.afterMedia(e)):(o.addClass("slide-loading"),a.loadMedia(i,function(){o.removeClass("slide-loading"),o.html(this),d.settings.afterMedia&&d.settings.afterMedia(e)}))))},setTitle:function(e){var i=null;t("#swipebox-title").empty(),p[e]!==s&&(i=p[e].title),i?(t("#swipebox-top-bar").show(),t("#swipebox-title").append(i)):t("#swipebox-top-bar").hide()},isVideo:function(e){if(e){if(e.match(/(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/)||e.match(/vimeo\.com\/([0-9]*)/)||e.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/))return!0;if(e.toLowerCase().indexOf("swipeboxvideo=1")>=0)return!0}},parseUri:function(e,s){var o=i.createElement("a"),a={};return o.href=decodeURIComponent(e),o.search&&(a=JSON.parse('{"'+o.search.toLowerCase().replace("?","").replace(/&/g,'","').replace(/=/g,'":"')+'"}')),t.isPlainObject(s)&&(a=t.extend(a,s,d.settings.queryStringData)),t.map(a,function(e,i){return e&&e>""?encodeURIComponent(i)+"="+encodeURIComponent(e):void 0}).join("&")},getVideo:function(e){var i="",t=e.match(/((?:www\.)?youtube\.com|(?:www\.)?youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/),s=e.match(/(?:www\.)?youtu\.be\/([a-zA-Z0-9\-_]+)/),o=e.match(/(?:www\.)?vimeo\.com\/([0-9]*)/),a="";return t||s?(s&&(t=s),a=n.parseUri(e,{autoplay:d.settings.autoplayVideos?"1":"0",v:""}),i='<iframe width="560" height="315" src="//'+t[1]+"/embed/"+t[2]+"?"+a+'" frameborder="0" allowfullscreen></iframe>'):o?(a=n.parseUri(e,{autoplay:d.settings.autoplayVideos?"1":"0",byline:"0",portrait:"0",color:d.settings.vimeoColor}),i='<iframe width="560" height="315"  src="//player.vimeo.com/video/'+o[1]+"?"+a+'" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>'):i='<iframe width="560" height="315" src="'+e+'" frameborder="0" allowfullscreen></iframe>','<div class="swipebox-video-container" style="max-width:'+d.settings.videoMaxWidth+'px"><div class="swipebox-video">'+i+"</div></div>"},loadMedia:function(e,i){if(0===e.trim().indexOf("#"))i.call(t("<div>",{"class":"swipebox-inline-container"}).append(t(e).clone().toggleClass(d.settings.toggleClassOnLoad)));else if(!this.isVideo(e)){var s=t("<img>").on("load",function(){i.call(s)});s.attr("src",e)}},getNext:function(){var e,i=this,s=t("#swipebox-slider .slide").index(t("#swipebox-slider .slide.current"));s+1<p.length?(e=t("#swipebox-slider .slide").eq(s).contents().find("iframe").attr("src"),t("#swipebox-slider .slide").eq(s).contents().find("iframe").attr("src",e),s++,i.setSlide(s),i.preloadMedia(s+1),d.settings.nextSlide&&d.settings.nextSlide(s)):d.settings.loopAtEnd===!0?(e=t("#swipebox-slider .slide").eq(s).contents().find("iframe").attr("src"),t("#swipebox-slider .slide").eq(s).contents().find("iframe").attr("src",e),s=0,i.preloadMedia(s),i.setSlide(s),i.preloadMedia(s+1),d.settings.nextSlide&&d.settings.nextSlide(s)):(t("#swipebox-overlay").addClass("rightSpring"),setTimeout(function(){t("#swipebox-overlay").removeClass("rightSpring")},500))},getPrev:function(){var e,i=t("#swipebox-slider .slide").index(t("#swipebox-slider .slide.current"));i>0?(e=t("#swipebox-slider .slide").eq(i).contents().find("iframe").attr("src"),t("#swipebox-slider .slide").eq(i).contents().find("iframe").attr("src",e),i--,this.setSlide(i),this.preloadMedia(i-1),d.settings.prevSlide&&d.settings.prevSlide(i)):(t("#swipebox-overlay").addClass("leftSpring"),setTimeout(function(){t("#swipebox-overlay").removeClass("leftSpring")},500))},nextSlide:function(){},prevSlide:function(){},closeSlide:function(){t("html").removeClass("swipebox-html"),t("html").removeClass("swipebox-touch"),t(e).trigger("resize"),this.destroy()},destroy:function(){t(e).unbind("keyup"),t("body").unbind("touchstart"),t("body").unbind("touchmove"),t("body").unbind("touchend"),t("#swipebox-slider").unbind(),t("#swipebox-overlay").remove(),t.isArray(o)||o.removeData("_swipebox"),this.target&&this.target.trigger("swipebox-destroy"),t.swipebox.isOpen=!1,d.settings.afterClose&&d.settings.afterClose()}},d.init()},t.fn.swipebox=function(e){if(!t.data(this,"_swipebox")){var i=new t.swipebox(this,e);this.data("_swipebox",i)}return this.data("_swipebox")}}(window,document,jQuery);