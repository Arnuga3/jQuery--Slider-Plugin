/*
Author: Arnis Zelcs
Created: 12/03/2016

Script: Sliding gallery plugin
*/
$.fn.slider_z = function(navbarHeight) {

	$('body').css({'overflow-x': 'hidden'});
	$('.sliderContainer').css({'overflow-x': 'auto', 'padding-bottom': '20px'});
	$('.sliderImages').css({'overflow-x': 'auto', 'z-index': '9'});

  $(this).find('a').on('mouseover', function() {
    $(this).find('img').css({'filter': 'saturate(3)'});
  });
  $(this).find('a').on('mouseout', function() {
    $(this).find('img').css({
        'filter': 'grayscale(50%)'});
  });

  var childImages = $(this).find('img');
	//Number of images
	var imgAmount = childImages.length;
	var screenWidth = $(window).width();
	var screenHeight = $(window).height();

	//Define gallery width variable(.5 is set as there is a strange behaviour in mobile browsers)
	var galleryWidth = .5;

	//Height of controller
	var controllerHeight = 80;

	//Width of scrollbar (tested in chrome)
	var scrollBar = 20;
	var currentOnScreen = 0;
	var scrollSpeed = 800;
	var navbarHeight = navbarHeight;
	var imgArr = [];

	function Slide(left, width) {
		this.left = left;
		this.width = width;
	}


	//Set Controller
	$('.sliderControl').css({"position": "absolute", "z-index": "10",
	"padding-left": "20px", "width": "100%", "height": controllerHeight + "px",
	"display": "flex", "justify-content": "center", "align-items": "center"});

	//Set the height of gallery to the window height minus controller width
	childImages.css({"height": (screenHeight - controllerHeight - navbarHeight) + "px", "float": "left", 'filter': 'grayscale(50%)'});

	//Read the width of each picture and make up the gallery width
	childImages.each(function() {
		var width = $(this).width();
		galleryWidth += width;
	});

	//Set the gallery container
	$(this).css({"width": galleryWidth + "px"});

	//Add ids to images and place them in an array
	childImages.each(function(ind, val) {

		var width = $(this).width();
		var leftPosition = $(this).position().left;

		var imgPath = $(this).attr('src');
		$('.sliderControl').append("<img class='sd23423sdfsd' id='imgControl" + (ind + 1) + "' src='" + imgPath + "' />");

		imgArr.push(new Slide(leftPosition, width));
	});

/*////////////////////////////
///////    CONTORLS    ///////
////////////////////////////*/

	//CSS settings
	$('.sliderControl img').css({'height': '50px', 'width': '50px', 'margin': '0px 5px',
	 'padding': '2px', 'border-radius': '50%'});

	//Small picture scrolling control
	$(".sd23423sdfsd").on('click touchstart', function() {
		var id = $(this).attr('id');
		var num = parseInt(id.replace( /^\D+/g, ''));
		currentOnScreen = num;
		//Center the image
		var widthDiff = screenWidth - imgArr[num - 1].width;
		var correction = widthDiff / 2;

		$('.sliderContainer').stop().animate({scrollLeft: (imgArr[num - 1].left - correction) + "px"}, scrollSpeed);
		childImages.each(function(ind, val) {
			if (ind == (num - 1)) {
				$(this).css({'filter': 'saturate(3)'});
			} else {
				$(this).css({'filter': 'grayscale(50%)'});
			}
		});
	});
};
