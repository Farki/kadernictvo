// detect scroll top or down
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

$(".nav-item").on("click", function() {
    $(".nav-item.active").removeClass("active")
    $(this).addClass("active")
})
