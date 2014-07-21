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
			+ '<div class="spa-shell-modal"></div><!--end of div spa-shell-modal-->'
		},
		stateMap = { $container : null },
		jqueryMap = {},
		setJqueryMap, initModule;
	// -------------------------END MODULE SCOPE VARIABLES--------------------------

	// --------------------------BEGIN UTILITY VARIABLES----------------------------
	// ---------------------------END UTILITY VARIABLES-----------------------------

	// ----------------------------BEGIN DOM METHODS------------------------------
	// Begin DOM method /setJqueryMap/
	setJqueryMap=function(){
		var $container = stateMap.$container;
		jqueryMap = { $container : $container};
	};
	// End DOM method /setJqueryMap/
	// -----------------------------END DOM METHODS-------------------------------

	// ----------------------------BEGIN EVENT HANDLERS-----------------------------
	// -----------------------------END EVENT HANDLERS------------------------------

	// ----------------------------BEGIN PUBLIC METHODS-----------------------------
	// Begin Public method /initModule/
	initModule = function($container){
		stateMap.$container = $container;
		$container.html(configMap.main_html);
		setJqueryMap();
	}
	// End Public method /initModule/
	return{initModule : initModule};
	// -----------------------------END PUBLIC METHODS------------------------------
}());
