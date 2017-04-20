$(document).ready(function () {

    var views = $('#impress div').length;
    for (var i = 1; i < (views+1); i++) {
        var xValue = (350 * (i-1)) - 350;
        $('#impress div:nth-child('+i+')').attr("data-x", xValue.toString());
    }

	var descText = $('#impress div:first-child').attr("description");
	$('.version-text').text("V1");
	$('.description-text').text(descText);

	var wto;

	var handleSlides = function(e) {

			console.log('our event', e);

		if(e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40 || e.type == 'click') {
			$('.version-text').fadeOut(500);
			$('.description-text').fadeOut(500);
			$('.header-text').fadeOut(500);	
		}

		clearTimeout(wto);
		wto = setTimeout(function() {
			var index;
			if(e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40 || e.type == 'click') {
				index = $("#impress div").index($(".present"));
				console.log("######INDEX: ", index);

				// var descText = $('#impress div:nth-child('+index+')').attr("description");
				var descText = document.querySelectorAll("#impress div .step")[index-1].getAttribute("description")
				var headerText = document.querySelectorAll("#impress div .step")[index-1].getAttribute("header")
				$('.version-text').text("V" + index);
				$('.description-text').text(descText);
				$('.header-text').text(headerText);

				$('.version-text').fadeIn(500);
				$('.description-text').fadeIn(500);
				$('.header-text').fadeIn(500);	
			}		
		}, 500)
	};

	$('body').click(handleSlides);
	$('body').keyup(handleSlides);



	// $('.frame').click(function() {
	// 	$('.frame').toggleClass("night");
	// 	$('.night-mode').toggleClass("invisible");
	// 	$('.day-mode').toggleClass("invisible")
	// })

	impress().init();


})