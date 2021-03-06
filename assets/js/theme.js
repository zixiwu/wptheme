! function ($) {
    "use strict";
    if ($('#canvas')[0]) {
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        var date = Date.now();

        function draw(delta) {
            requestAnimationFrame(draw);
            canvas.width = canvas.width;
            ctx.fillStyle = "#fff";
            var randomLeft = Math.abs(Math.pow(Math.sin(delta / 1000), 2)) * 50;
            var randomRight = Math.abs(Math.pow(Math.sin((delta / 1000) + 10), 2)) * 50;
            var randomLeftConstraint = Math.abs(Math.pow(Math.sin((delta / 1000) + 2), 2)) * 50;
            var randomRightConstraint = Math.abs(Math.pow(Math.sin((delta / 1000) + 1), 2)) * 50;
            ctx.beginPath();
            ctx.moveTo(0, randomLeft);
            // ctx.lineTo(canvas.width, randomRight);
            ctx.bezierCurveTo(canvas.width / 3, randomLeftConstraint, canvas.width / 3 * 2, randomRightConstraint, canvas.width, randomRight);
            ctx.lineTo(canvas.width, canvas.height);
            ctx.lineTo(0, canvas.height);
            ctx.lineTo(0, randomLeft);
            ctx.closePath();
            ctx.fill();
        }
        requestAnimationFrame(draw);
    }
    new WOW().init();
	
	
	

// 点击表情在评论区插入表情代码
$('body').on('click','.dropdown-smilie a',
function() {
    var ab = $(this).attr('href');// 抓取href内的值
    var abc = ab.split('\'');// 按符号/来分割字符串为几个数组  
    var content = $('#comment').val(); // textarea区的id
    content += abc[1];
    $('#comment').val(content); // textarea区的id
});
    

	/* ---------------------------------------------- /*
    * article_index
    /* ---------------------------------------------- */
	$(".toggle-theme-panel").on("click",
    function(t) {
        t.preventDefault(),
        $(".article_panel").toggleClass("active")
    })
	
    $('body').on('click', '.comment-reply-link',
        function () {
            addComment.moveForm("comment-" + $(this).attr('data-commentid'), $(this).attr('data-commentid'), "respond", $(this).attr('data-postid'));
            return false;
        });

    $('a[href="#search"]').on('click',
        function (event) {
            $('#search').addClass('open');
            $('#search > form > input[type="search"]').focus();
            return false;
        });
    $('#search, #search button.close').on('click keyup',
        function (event) {
            if (event.target == this || event.target.className == 'close' || event.keyCode == 27) {
                $(this).removeClass('open');
            }
        });
    // Headroom - show/hide navbar on scroll
    if ($('.headroom')[0]) {
        var headroom = new Headroom(document.querySelector("#navbar-main"), {
            offset: 300,
            tolerance: {
                up: 30,
                down: 30
            },
        });
        headroom.init();
    }
    if ($('.prettyprint').length) {
        window.prettyPrint && prettyPrint();
    }
    // Datepicker
    $('.datepicker')[0] && $('.datepicker').each(function () {
        $('.datepicker').datepicker({
            disableTouchKeyboard: true,
            autoclose: false
        });
    });	
	//commentinfo
	var hide = document.getElementById('toggle-comment-author-info');
    if(!hide) {  
    }else{
    $('#comment-author-info').hide();
    }
    // lolijump
    $(window).scroll(function() {
        if ($(window).scrollTop() >= 100) {
            $("#lolijump").fadeIn();
        } else {

            $("#lolijump").fadeOut();
        }
    });
    $("#lolijump").click(function(event) {
        $('html,body').animate({
            scrollTop: 0
        },
        500);
        return false;
    });	
    // Tooltip
	$('[data-toggle="tooltip"]').tooltip();

    // Popover
    $('[data-toggle="popover"]').each(function () {
        var popoverClass = '';
        if ($(this).data('color')) {
            popoverClass = 'popover-' + $(this).data('color');
        }
        $(this).popover({
            trigger: 'focus',
            template: '<div class="popover ' + popoverClass + '" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
        })
    });

    // Additional .focus class on form-groups
    $('.form-control').on('focus blur',
        function (e) {
            $(this).parents('.form-group').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
        }).trigger('blur');

    // NoUI Slider
    if ($(".input-slider-container")[0]) {
        $('.input-slider-container').each(function () {

            var slider = $(this).find('.input-slider');
            var sliderId = slider.attr('id');
            var minValue = slider.data('range-value-min');
            var maxValue = slider.data('range-value-max');

            var sliderValue = $(this).find('.range-slider-value');
            var sliderValueId = sliderValue.attr('id');
            var startValue = sliderValue.data('range-value-low');

            var c = document.getElementById(sliderId),
                d = document.getElementById(sliderValueId);

            noUiSlider.create(c, {
                start: [parseInt(startValue)],
                connect: [true, false],
                //step: 1000,
                range: {
                    'min': [parseInt(minValue)],
                    'max': [parseInt(maxValue)]
                }
            });

            c.noUiSlider.on('update',
                function (a, b) {
                    d.textContent = a[b];
                });
        })
    }

    if ($("#input-slider-range")[0]) {
        var c = document.getElementById("input-slider-range"),
            d = document.getElementById("input-slider-range-value-low"),
            e = document.getElementById("input-slider-range-value-high"),
            f = [d, e];

        noUiSlider.create(c, {
                start: [parseInt(d.getAttribute('data-range-value-low')), parseInt(e.getAttribute('data-range-value-high'))],
                connect: !0,
                range: {
                    min: parseInt(c.getAttribute('data-range-value-min')),
                    max: parseInt(c.getAttribute('data-range-value-max'))
                }
            }),
            c.noUiSlider.on("update",
                function (a, b) {
                    f[b].textContent = a[b]
                })
    }

    // When in viewport
    $('[data-toggle="on-screen"]')[0] && $('[data-toggle="on-screen"]').onScreen({
        container: window,
        direction: 'vertical',
        doIn: function () {
                //alert();
            },
            doOut: function () {
                // Do something to the matched elements as they get off scren
            },
            tolerance: 200,
        throttle: 50,
        toggleClass: 'on-screen',
        debug: false
    });

    // Scroll to anchor with scroll animation
    $('[data-toggle="scroll"]').on('click',
        function (event) {
            var hash = $(this).attr('href');
            var offset = $(this).data('offset') ? $(this).data('offset') : 0;

            // Animate scroll to the selected section
            $('html, body').stop(true, true).animate({
                    scrollTop: $(hash).offset().top - offset
                },
                600);

            event.preventDefault();
        });

}(window.jQuery);