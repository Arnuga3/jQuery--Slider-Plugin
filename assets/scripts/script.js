$(window).on('load', function() {

	// this will fire after the entire page is loaded, including images
	//param is the navbar height of the page
	$(".sliderImages").slider_z(0);
	$(".sliderControl img:first").click();

	// three-dot menu btn toggle animation
	$('#menuBtn').on('click', function() {
		$('#menuContainer').animate({width: "toggle", height: "toggle"}, 'fast');
	});
});
