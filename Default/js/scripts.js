(function ($, Drupal, window, document, undefined) {$(document).ready(function() {

	//INXCO Form protection
	if ( jQuery('#webform-component-check input').length > 0 ) {
		Query('#webform-component-check input').val('INXCO_Protected');
	}

	//form tracking
		if ( jQuery('form.webform-client-form').length > 0 ) {
			jQuery.each(Drupal.ajax,function(index, item) {
				if ( item.form != undefined ) {
					item.form.ajaxSuccess(function(event, xhr, settings) {
						if ( settings.url.indexOf('webform_ajax') > -1 ) {
							_gaq.push(['_trackEvent', 'forms','submit',Drupal.settings.myFormTracker]);
							if ( console != undefined ) {
								console.log('form tracked:'+Drupal.settings.myFormTracker);
							}
						}
					});
				}
			});
		}



	//- fix for drupal.org/node/1250444
	$("#block-menu-block-1").find("ul.menu li.expanded").each(function() {
		if ( ! $(this).hasClass('active-trail') ) {
			$(this).removeClass('expanded');
			$(this).addClass('collapsed');
			$(this).children().remove('ul.menu')
		}
	});

	//make teaser clicks actually happen
	$('article.teaser').each(function(){
		$(this).click(function(){
			window.location = $(this).find('h2 a').attr('href');
		});
		$(this).find('footer.links').each(function() {
			$(this).click(function(e){
				e.stopPropagation();
			});
		});
		$(this).addClass('block-hover');
	});


	//make promoted & feed block clicks actually happen
	$('#asides_bottom .block').each(function(){
		if ($(this).find('h3 a').attr('href')){
			$(this).click(function(){
				window.location = $(this).find('h3 a').attr('href');
			});
			$(this).find('footer.links').each(function() {
				$(this).click(function(e){
					e.stopPropagation();
				});
			});
			$(this).addClass('block-hover');
		}
	});

	$('#content a').click(function(){
		if ( jQuery($(this).attr('href')).length > 0 ) {
			$('html, body').animate({
				scrollTop: $( $(this).attr('href') ).offset().top
			}, 500);
			return false;
		}
	});




	//notification
	var notification_id = '';
	if ($(".notification").length > 0){
		notification_id = $('.notification').attr('id');
	}

	if ($.cookie(notification_id) == null){
		$('.notification').notify();
		$('.notification .close').click(function () {
			$.cookie(notification_id, "1", { expires: 7 });
		});
	}

});})(jQuery, Drupal, this, this.document);