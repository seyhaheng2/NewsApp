
// as the page loads, call these scripts
jQuery(document).ready( function($) {

	var iconSVG = '';

	$('#main-navigation .icon-list').click(
		function(){
			$('body').toggleClass('menu-expand');
		}
	);
	
	fixSidebarHeight();

	$('.video-container iframe').removeAttr('width').removeAttr('height');

	$('#primary').fitVids();

	$('#secondary').fitVids();


	$('.tabs').fwTabs();

	$('.share-box div > a').click( 
		function(){
			$('#share-post').toggle();
			return false;
		}
	);

	$('.slider-view').imagesLoaded(
		function(){
			fixFlexsliderNav(); 
		} 
	);

	$(window).resize( 
		function(){
			fixFlexsliderNav();
			fixSidebarHeight();
		}
	);

	//$('#main-navigation').hide();

	$('#primary-menu li').has('ul').append('<a href="#" class="submenu-expand">expand</a>');
	$('#primary-menu .sub-menu').hide();
	$('#primary-menu .submenu-expand').live('click', 
		function(){
			parent = $(this).parent();
			$('> .sub-menu', parent).slideToggle('fast');
			$(this).toggleClass('arrow-up');
		}
	);

	$('#show-search-button').click(
		function(e){
			$(this).toggleClass('search-button-on');
			$('body').toggleClass('search-show');
			$('body').removeClass('navigation-show');
			$('#show-menu-button').removeClass('menu-button-on');
			$('#main-search #s').focus();
			e.preventDefault();
		}
	);

	$('#show-menu-button').click(
		function(e){
			$(this).toggleClass('menu-button-on');
			$('body').toggleClass('navigation-show');
			$('body').removeClass('search-show');
			$('#show-search-button').removeClass('search-button-on');
			e.preventDefault();
		}
	);

	$('#show-sidebar-button').click(
		function(e){
			$('body').toggleClass('sidebar-show');
			e.preventDefault();
		}
	);
	
	$('.load-more a').live('click',
		function(e){
			widgetId = $(this).parents('.widget-wrap').attr("id");
			e.preventDefault();
			var linkText = $(this).html();
			$(this).addClass('loading').text('Loading...');
			$.ajax({
				type: "GET",
				url: $(this).attr('href') + '#content',
				dataType: "html",
				success: 
					function(out){
						result = $(out).find('#' + widgetId + ' .post');
						nextlink = $(out).find('#' + widgetId + ' .load-more a').attr('href');
						$('#' + widgetId + ' .load-more').before(result.fadeIn(300));
						$('#' + widgetId + ' .load-more a').removeClass('loading').html(linkText);
						if (nextlink != undefined) {
							$('#' + widgetId + ' .load-more a').attr('href', nextlink);
						} else {
							$('#' + widgetId + ' .load-more').remove();
						}
					},
				error :
					function(){
						$('#' + widgetId + ' .load-more').before('<p>Failed</p>');
					}
			});
		}
	);

	$('.gallery-slider').each( 
		function(){
			gallery = $(this);
			count = $('.gallery-item', gallery).length;
			$('.gallery-item', gallery).each(
				function(){
					galleryItem = $(this);
					idx = $('.gallery-item', gallery).index(galleryItem) + 1;
					$('.gallery-caption', galleryItem).prepend('<h5 class="image-number">' + idx + '/' + count + '</h5>')
				}
			);
		}
	);


	function fixFlexsliderNav(){
		$('.slider-view').each( 
			function(){
				thisSlider = $(this);
				imgHeight = $('.flex-active-slide img').height();
				$('.flex-direction-nav', thisSlider).css('top', (imgHeight + 10) +  'px');
			}
		);
	}

	/*function fixGalleryFlexsliderNav(){
		$('.gallery-slider').each(
			function(){
				slider = $(this);
				h = $('.flex-active-slide', this).height();
				$('.flex-direction-nav', slider).css(h/2 + 'px');
			}
		);
	}*/

	function fixSidebarHeight(){
		headerHeight = $('#main-header').outerHeight();
		$('#secondary').css('height', '100%');
		sidebarHeight = $('#secondary').outerHeight();		

		$('#main-content').css('height', '100%');
		newHeight = $('#main-content').height();
		$('#main-content').height(newHeight - headerHeight);
		$('#secondary, #main-navigation').height(newHeight - headerHeight - 25);
	}


});	


( function($) {

	$.fn.fwTabs = function(options){

		var settings = $.extend({}, $.fn.fwTabs.defaults, options);
		var active = 0;
		
		var tabs = $(this);
			
		$('.nav-tab li', tabs ).click( function(){
			idx = $(this).index();
			if ( idx == $('.nav-tab li.tab-active', tabs ).index() ) return false;
			startTab(tabs, idx);
			return false;
		});
		
		function startTab(tabs, idx){
			$('.active', tabs).fadeOut().removeClass('active').addClass('hide');
			$('.tab-content', tabs).eq(idx).removeClass('hide').addClass('active').fadeIn();
			$('li.tab-active', tabs).removeClass('tab-active');
			$('.nav-tab li', tabs).eq(idx).addClass('tab-active');
		}
		
	}

})( jQuery );