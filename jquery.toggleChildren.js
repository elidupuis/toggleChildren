/*!
 * jQuery ToggleChildren Plugin
 * Copyright (c) 2010 Eli Dupuis
 * Version: 0.3 (June 23, 2010)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) and GPL (http://creativecommons.org/licenses/GPL/2.0/) licenses.
 * Requires: jQuery v1.2 or later
 */


(function($) {

var ver = '0.3';

jQuery.fn.toggleChildren = function(options) {

	// iterate and reformat each matched element
	return this.each(function() {
		var $this = $(this),
			opts = $.extend({}, $.fn.toggleChildren.defaults, options),
			children =  $this.children(),
			isCollapsed = false,
			childOverage;

		if (opts.reverse) {
			childOverage = children.filter(':lt(' + (children.length - opts.items) + ')');
		}else{
			opts.items--;	//	account for 0th item so opts.items is visually accurate.
			childOverage = children.filter(':gt(' + opts.items + ')');
		};
		
		
		
		//	dynamic numbering for view all toggle links
		//	this should beb cleaned up. i'm sure there's a better way to do this...
		opts.viewMore = opts.viewMore.replace('#ALL#', children.length);
		opts.viewMore = opts.viewMore.replace('#HIDDEN#', childOverage.length);
		opts.viewMore = opts.viewMore.replace('#SHOWN#', children.length-childOverage.length);
		opts.viewLess = opts.viewLess.replace('#ALL#', children.length);
		opts.viewLess = opts.viewLess.replace('#HIDDEN#', childOverage.length);
		opts.viewLess = opts.viewLess.replace('#SHOWN#', children.length-childOverage.length);

		
		//	if we have more than limit, hide extras and attach toggle functionality:
		if(children.length > opts.items){

			//	add view more link
			var viewmore = opts.createToggler(opts.viewMoreText, opts.viewLessText);
			viewmore.bind('click', function(){
				if(isCollapsed){
					childOverage.show();
					$(this).html(opts.viewLess);
					isCollapsed = false;
				}else{
					childOverage.hide();
					$(this).html(opts.viewMore);
					isCollapsed = true;
				}
				return false;
			});
			opts.appendToggler($this, viewmore);

			//	enter hidden state initially
			viewmore.click();
		};
		
	});
};	

//	defaults
$.fn.toggleChildren.defaults = {
	items: 5,						//	default number of list items to show
	viewMore: 'View #HIDDEN# More Items',	//	text that is displayed in toggle link
	viewLess: 'View only #SHOWN# Items',	//	text that is displayed in toggle link
	reverse: false,					//	show the last n number of children instead of the first n
	createToggler: function(viewMoreText, viewLessText){
		return $('<a href="#">'+viewMoreText+'</a>');
	},
	appendToggler: function(element, link){
		element.append(link);
	}
};


//	public function/method
$.fn.toggleChildren.ver = function() { return "jquery.toggleChildren ver. " + ver; };
	
// end of closure
})(jQuery);