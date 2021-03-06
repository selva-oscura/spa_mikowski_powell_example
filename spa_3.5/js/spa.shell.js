/*
 * spa.shell.js
 * Shell module for SPA
*/
/* jslint settings		browser	: true, 	continue	: true,
	devel 	: true, 	indent	: 2, 		maxerr	: 50,
	newcap	: true, 	nomen	: true, 	plusplus	: true,
	regexp	: true,		sloppy	: true, 	vars 		: true,
	white	: true
 */
/* global $, spa */

spa.shell = (function(){
	// ------------------------BEGIN MODULE SCOPE VARIABLES-------------------------
	var 
		configMap = {
			// dynamically creates the basic html layout for the spa.html page
			main_html : String()
			+ '<div class="spa-shell-head">'
				+ '<div class="spa-shell-head-logo"></div>'
				+ '<div class="spa-shell-head-acct"></div>'
				+ '<div class="spa-shell-head-search"></div>'
			+ '</div><!--end of div spa-shell-head-->'
			+ '<div class="spa-shell-main">'
				+ '<div class="spa-shell-main-nav"></div>'
				+ '<div class="spa-shell-main-content"></div>'
			+ '</div><!--end of div spa-shell-main-->'
			+ '<div class="spa-shell-foot"></div><!--end of div spa-shell-foot-->'
			+ '<div class="spa-shell-chat"></div><!--end of div spa-shell-chat-->'
			+ '<div class="spa-shell-modal"></div><!--end of div spa-shell-modal-->',

			// the following 4 chat setting enable developers to configure the speed and height of slider motions
			chat_extend_time		: 1000,			
			chat_retract_time		: 300,
			chat_extend_height		: 450,
			chat_retract_height 	: 15,
			// add retracted and extended title text to configMap to set tool-tip text to prompt user action
			chat_extended_title		: 'Click to retract',
			chat_retracted_title	: 'Click to extend'
		},
		stateMap = { 
			$container 			: null,
			// list is_chat_retracted in stateMap so they can easily be found and inspected
			is_chat_retracted	: true 
		},
		jqueryMap = {},
		//
		setJqueryMap, toggleChat, onClickChat, initModule;
	// -------------------------END MODULE SCOPE VARIABLES--------------------------

	// --------------------------BEGIN UTILITY VARIABLES----------------------------
	// ---------------------------END UTILITY VARIABLES-----------------------------

	// ----------------------------BEGIN DOM METHODS------------------------------
	// Begin DOM method /setJqueryMap/
		// caches jQuery collections to reduce number of jQuery document traversals & improve performance
	setJqueryMap=function(){
		var $container = stateMap.$container;
		jqueryMap = {
			$container : $container,
			$chat : $container.find('.spa-shell-chat')
		};
	};
	// End DOM method /setJqueryMap/
	
	// Begin DOM method /toggleChat/
	// Purpose		: Extends or retracts chat slider
	// Arguments	:
	//	* do_extend	- if true, extends slider; if false, retracts slider
	//	* callback 	- optional function to execute at end of animation
	// Settings 	: 
	// 	* chat_extend_time, chat chat_retract_time
	// 	* chat_extend_height, chat_retract_height
	// Returns 		: 
	// 	* true 	- slider animation activated
	// 	* false	- slider animation not activated
	// State 		: sets stateMap.is_chat_retracted
	//	* true	- slider is retracted
	//	* false	- slider is extended
	//
	toggleChat=function(do_extend, callback){
		var
			px_chat_ht 	= jqueryMap.$chat.height();
			is_open			= px_chat_ht === configMap.chat_extend_height,
			is_closed		= px_chat_ht === configMap.chat_retract_height,
			is_sliding 		= !is_open && !is_closed;

		// avoid race condition
		if(is_sliding){return false;}

		// Begin extend chat slider
		if(do_extend){
			jqueryMap.$chat.animate(
				{height : configMap.chat_extend_height},
				configMap.chat_extend_time,
				function(){
					jqueryMap.$chat.attr(
						'title', configMap.chat_extended_title
					);
					stateMap.is_chat_retracted = false;
					if(callback){callback(jqueryMap.$chat);}
				}
			);
			return true;
		}
		// End extend chat slider

		// Begin retract chat slider
		jqueryMap.$chat.animate(
			{height : configMap.chat_retract_height},
			configMap.chat_retract_time,
			function(){
				jqueryMap.$chat.attr(
					'title', configMap.chat_retracted_title
				);
				stateMap.is_chat_retracted = true;
				if(callback){callback(jqueryMap.$chat);}
			}
		);
		return true;
		// End retract chat slider
	}
	// End DOM method /toggleChat/

	// -----------------------------END DOM METHODS-------------------------------

	// ----------------------------BEGIN EVENT HANDLERS-----------------------------
	// Begin onClickChat event handler to call toggleChat
	onClickChat = function(event){
		toggleChat(stateMap.is_chat_retracted);
		return false;
	}	
	// Begin onClickChat event handler to call toggleChat
	// -----------------------------END EVENT HANDLERS------------------------------

	// ----------------------------BEGIN PUBLIC METHODS-----------------------------
	// Begin Public method /initModule/
		// initiates the application
	initModule = function($container){
		// load HTML and map jQuery collections
		stateMap.$container = $container;
		$container.html(configMap.main_html);
		setJqueryMap();

		// test toggle  <-- commented out after verifying the toggleChat worked
		// setTimeout(function(){toggleChat(true);}, 3000);
		// setTimeout(function(){toggleChat(false);}, 8000);

		// initialize chat slider and bind click handler
		stateMap.is_chat_retracted = true;
		jqueryMap.$chat
			.attr('title', configMap.chat_retracted_title)
			.click(onClickChat);
	}
	// End Public method /initModule/
	return{initModule : initModule};
	// -----------------------------END PUBLIC METHODS------------------------------
}());
