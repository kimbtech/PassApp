/**
 * PassApp by KIMB-technologies
 * (c) 2018, released unter terms of MIT License
 * https://github.com/kimbtech/PassApp
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
