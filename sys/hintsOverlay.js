/**
 * PassApp by KIMB-technologies
 * (c) 2018, released unter terms of BSD-3-Clause License
 * https://github.com/KIMB-technologies/PassApp
 */

function hintsOverlay(){
	const openHintsButton = "button#openHints";
	const closeHintsButton = "button#closeHints"
	const hintsOverlayDiv = "div#hintsOverlay";

	function openCloseInit(){
		$( openHintsButton ).click( function (){
			$( hintsOverlayDiv ).removeClass( "hidden" );
		});
		$( closeHintsButton ).click( function (){
			$( hintsOverlayDiv ).addClass( "hidden" );
		});
	}
	openCloseInit();
}
