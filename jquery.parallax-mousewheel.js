(function ($) {
  // get window size
  var $window = $(window);
  var windowHeight = $window.height();

  // update the size of window when resize
  $window.resize(function () {
    windowHeight = $window.height();
  });

  // define a function
  $.fn.parallax = function (speedFactor, outerHeight) {
    var $this = $(this);
    var getHeight;
    var firstTop;
    var paddingTop = 0;
    //get the starting position of each element to have parallax applied to it 
    $this.each(function () {
      firstTop = $this.offset().top;
    });

    if (outerHeight) {
      getHeight = function (jqo) {
        return jqo.outerHeight(true);
      };
    } else {
      getHeight = function (jqo) {
        return jqo.height();
      };
    }

    // setup defaults if arguments aren't specified
    if (arguments.length < 1 || speedFactor === null) speedFactor = 0.1;
    if (arguments.length < 2 || outerHeight === null) outerHeight = true;

    // function to be called whenever the window/div is scrolled or resized
    function refresh() {
      var pos = $window.scrollTop();
      // if your using a div wrapped with another div with overlflow:scroll and fixed width
      // comment above line and uncomment below.
      // position top alwats retugn a negative balue
      // var pos = -1 * ($('#content').position().top - 95); 

      $this.each(function () {
        var $element = $(this);
        var top = $element.offset().top;
        var height = getHeight($element);

        // Check if totally above or totally below viewport
        if (top + height < pos || top > pos + windowHeight) {
          return;
        }
        // $this.css('backgroundPosition', "0px  " + Math.round((firstTop - pos) * speedFactor) + "px");
        // comment above and uncomment below two lines for background images.
        // you can set any property here to make it more dynamic
        $this.css('margin-top', Math.round((firstTop - pos) * speedFactor) + "px");
        $this.css('position', "relative");
      });
    }

    // $window.bind('scroll', refresh).resize(refresh);
    // if your using a div wrapped with another div with overlflow:scroll and fixed width
    // comment above line and uncomment below.
    // to use this feature you need to add https://github.com/brandonaaron/jquery-mousewheel in to your header.
    $('#content').bind('mousewheel', refresh).resize(refresh);
    refresh();
  };
})(jQuery);