/*
 * Written for rafi.me, by Rafi Khan.
 * Edited June 6, 2013
 *
 */
var load_blog_entries, make_soundulous_video;

load_blog_entries = function() {
  return $.get("/get_blog", function(data) {
    $("#blog-entries").html(data);
    $(".english").hide();
    return true;
  });
};

make_soundulous_video = function() {
  $(".soundulous-video").click(function() {
    var url;
    url = this.href.replace(new RegExp("watch\\?v=", "i"), "v/");
    url += "?autoplay=1";
    $.fancybox({
      padding: 0,
      autoScale: false,
      transitionIn: "none",
      transitionOut: "none",
      width: 640,
      height: 385,
      href: url,
      type: "swf",
      swf: {
        wmode: "transparent",
        allowfullscreen: "true"
      }
    });
    return false;
  });
  return true;
};

$(document).ready(function() {
  var path, w, small_screen = 800;
  path = window.location.pathname;
  w = $(window).width();

  // Porfolio
  if(path === '/portfolio' && w > small_screen) {
    make_soundulous_video();
  }
  $(".icon").mouseenter(); // Load images
  var arrow_show = (w < 480) ? -1400 : -600; // Project descriptions start lower on phone.
  $(window).scroll(function() {
    ($("body,html,document").offset().top < arrow_show) ?
      $("#arrow").removeClass('hidden') : $("#arrow").addClass('hidden');
  });
  if (w > small_screen) {
    $(".big_project").click(function() {
      var dest = $(".desc[name='" + $(this).attr("target") + "']").offset().top;
      // We start basically at the top, so we want to scroll for a time proportional
      // to the distance we're travelling (to keep speed constant).
      // On mobile, we just jump to.
      $("body,html,document").animate({
        scrollTop: dest
      }, dest / 3);
      return false;
    });
  }
  // No tokens on small screens.
  if (w > small_screen) {
    $(".big_project").mouseenter(function() {
      var tok;
      tok = $(this).attr("tokens").split(" ");
      return $(tok).each(function(i, j) {
        return $(".token[name='" + j + "']").addClass('highlight');
      });
    }).mouseleave(function() {
      return $(".token").removeClass('highlight');
    });
  }

  // Life
  $(".play_item").click(function() {
    var target;
    target = $(this).attr("target");
    $(".play_content").removeClass("hidden");
    $(".play_frame[target!='" + target + "']").addClass('hide');
    $(".play_frame[target='" + target + "']").removeClass('hide');
    return true;
  });
  $(".play_close").click(function() {
    $(".play_content").addClass("hidden");
    $(".play_frame").addClass('hide');
  });

  // Blog
  if (path === "/italia") {
    load_blog_entries();
    if (w > small_screen) {
      $(".fancybox-thumb").fancybox({
        changeFade: 1000,
        titlePosition: "over",
        padding: 0,
        overlayOpacity: 0.8,
        overlayColor: "#000",
        helpers: {
          title: {
            type: "outside"
          },
          overlay: {
            opacity: 0.8,
            css: {
              "background-color": "#000"
            }
          },
          thumbs: {
            width: 50,
            height: 50
          },
          media: {}
        }
      });
    }
  }
  $("#to-italiano").click(function() {
    $(".english").hide();
    $(".italiano").show();
    return $(".notice").slideUp("fast");
  });
  return $("#to-english").click(function() {
    $(".italiano").hide();
    $(".english").show();
    return $(".notice").slideDown("fast");
  });
});
