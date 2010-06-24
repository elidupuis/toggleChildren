/**
 *	jQuery preventChildren plugin
 *	@version 0.2
 *	@date April 28, 2010
 *	@author Eli Dupuis
 *	@copyright (c) 2009 Lift Interactive (http://liftinteractive.com)
 *	Dual licensed under the MIT and GPL licenses:
 *	http://www.opensource.org/licenses/mit-license.php
 *	http://www.gnu.org/licenses/gpl.html
 *	Requires: jQuery v1.3.2 or later (most likely works fine with earlier versions, but unteseted)

*/

(function($) {

var ver = '0.2';

jQuery.fn.preventChildren = function(options) {

	// iterate and reformat each matched element
	return this.each(function() {
		var $this = $(this);
		var opts = $.extend({}, $.fn.preventChildren.defaults, options);
		
		opts.items--;	//	account for 0th item so opts.item is visually accurate.
		
		var childOverage = $this.children(':gt('+opts.items+')');
		
		//	if we have more than limit, hide extras and attach toggle functionality:
		if($this.children().length > opts.items){
			childOverage.hide();

			//	add view more link
			var viewmore = $('<a href="#">'+opts.viewMore+'</a>').addClass('more');
			viewmore.click(function(){
				var hidden = $this.children(':hidden');
				if(hidden.length > 0){
					$this.children(':hidden').show();
					$(this).html(opts.viewLess);
				}else{
					$this.children(':gt('+opts.items+')').filter(':not(:last)').hide();
					$(this).html(opts.viewMore);
				}
				return false;
			}).appendTo($this);
			if (opts.moreWrapper) {
				viewmore.wrap(opts.moreWrapper);
			};
		};
		
	});
};	

//	defaults
$.fn.preventChildren.defaults = {
	items:5,						//	default number of list items to show
	viewMore:'View More Items',		//	text that is displayed in toggle link
	viewLess:'View Less Items',		//	text that is displayed in toggle link
	moreWrapper:false
};

//	public function/method
$.fn.preventChildren.ver = function() { return "jquery.preventChildren ver. " + ver; };
	
// end of closure
})(jQuery);