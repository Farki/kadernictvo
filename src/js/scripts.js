$(document).ready(function(){
    // MENU SCROLL SHOW/HIDE
    if ($(".js_smart-scroll").length > 0) {
        const startSmartScroll = 100
        const firstScreenHeight = $("#myCarousel").height()
        let lastScrollTop = 0
        $(window).on("scroll", function () {
            let scrollTop = $(this).scrollTop()
            if (scrollTop > firstScreenHeight) {
                $(".navbar").addClass("dark-bg")
            } else {
                $(".navbar").removeClass("dark-bg")
            }
            if (scrollTop < lastScrollTop) {
                $(".js_smart-scroll").removeClass("scrolled-down").addClass("scrolled-up")
            } else {
                if (scrollTop > startSmartScroll) {
                    $(".js_smart-scroll").removeClass("scrolled-up").addClass("scrolled-down")
                }
            }
            lastScrollTop = scrollTop
        })
    }

    // MENU ACTIVE CHANGE
    $(".nav-item").on("click", function() {
        $(".nav-item.active").removeClass("active")
        $(this).addClass("active")
    })

    // SMOOTH SCROLL ON MENU TARGETS
    $("a").on('click', function(event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            const hash = this.hash

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function(){

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        }
    });
});
