(function ($) {
    "use strict";

    let lastScrollTop = 0;

    $(window).on('scroll', function () {
        let st = $(this).scrollTop(),
            $navBar = $('.js-sticky');
        if (st > lastScrollTop) {
            st >= 200 ? $navBar.removeClass('_sticky').addClass('_without-sticky') : $navBar.addClass('_sticky').removeClass('_without-sticky');
        } else {
            $('.js-sticky').addClass('_sticky').removeClass('_without-sticky');
        }
        lastScrollTop = st;
    });
})(jQuery);
