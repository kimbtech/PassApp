/**
 * PassApp by KIMB-technologies
 * (c) 2018, released unter terms of MIT License
 * https://github.com/kimbtech/PassApp
 */

//public callabels
var guiSetup_setHash;

function guiSetup(){
	//global vars
	var clipboard = null;

	//global consts, DOM Elements
	const clipboardButton = "button#copyButton";
	const hashInputElement = "input#resultVisible";
	const hashHiddenElement = "input#resultHidden";
	const typeChooserSelect = "select#typeChooser";
	const generateButtonElement = "button#generate";
	const inputPasswordElement = "input#password";
	const selectDestChooser = "select#destChooser";
	const inputOtherDest = "input#secondPart";
	const clearButton = "button#clearButton";

	/**
	 * init, put to clipboard
	 */
	function loadClipboard(){
		if( clipboard != null ) {
			clipboard.destroy();
		}
		clipboard = new Clipboard(clipboardButton, {
			text: function (trigger) {
				return $( hashInputElement ).val() == "" ? " " : $( hashInputElement ).val();
			}
		});
	}
	loadClipboard();

	/**
	 * Sets the hashed string/ the generated password correclty in the gui elements
	 */
	function setHash( string ){
		$( hashInputElement ).val( string );
		$( hashHiddenElement ).val( ("*").repeat( string.length ) );
		$( hashInputElement ).click();
	}
	guiSetup_setHash = setHash;

	/**
	 * Change gui, if hash type changed
	 */
	function typeChooserInit(){
		$( typeChooserSelect ).on( "change", function ( e ){
			switch ( $( typeChooserSelect ).val() ) {
				case "justPass":
					$( selectDestChooser ).addClass("hidden");
					$( inputOtherDest ).addClass("hidden");
					break;
				case "typDest":
					$( selectDestChooser ).removeClass("hidden");
					$( inputOtherDest ).addClass("hidden");
					break;
				case "othDest":
					$( selectDestChooser ).addClass("hidden");
					$( inputOtherDest ).removeClass("hidden");
					break;
			}
			Saver.set( $( typeChooserSelect ).val(), "typeChooser" );
		});
	}
	typeChooserInit();

	/**
	 * Generate Hashes
	 */
	function generateButton(){
		function enterevent(e) {
			if( e.keyCode == 13 ){
				genHash();
			}
			else{
				setHash("");
			}
		}

		function genHash(){
			switch ( $( typeChooserSelect ).val() ) {
				case "justPass":
					setHash( Generator.generate( $( inputPasswordElement ).val() ) );
					break;
				case "typDest":
					setHash( Generator.generate( $( inputPasswordElement ).val(), $( selectDestChooser ).val() ) );
					break;
				case "othDest":
					setHash( Generator.generate( $( inputPasswordElement ).val(), $( inputOtherDest ).val() ) );
					break;
			}
			Saver.set( $( inputOtherDest ).val(), "othDest" );
			Saver.set( $( selectDestChooser ).val(), "typDest" );
			Generator.cleanUp(); // clean memory
		}

		$( generateButtonElement ).on( "click", genHash );
		$( selectDestChooser ).on( "change", genHash );
		$( inputPasswordElement ).on( "change", genHash );
		$( inputOtherDest ).on( "change", genHash );
		$( typeChooserSelect ).on( "change", genHash );
		$( inputPasswordElement ).on( "keypress", enterevent );
		$( inputOtherDest ).on( "keypress", enterevent );
	}
	generateButton();

	/**
	 * Hashes im Input Feld
	 */
	function hashView(){
		var timeout;
		$( hashHiddenElement ).on( "click", function (){
			$( hashInputElement ).removeClass("hidden");
			$( hashHiddenElement ).addClass("hidden");

			if( timeout != null ){
				clearTimeout( timeout );
			}
			timeout = setTimeout( function () {
				$( hashInputElement ).click();
			}, 5000 );
		});
		$( hashInputElement ).on( "click", function (){
			$( hashInputElement ).addClass("hidden");
			$( hashHiddenElement ).removeClass("hidden");
		});
	}
	hashView();

	/**
	 * aus LocalStorage laden
	 */
	function loadLocalStorage(){
		if( Saver.get("othDest") != undefined ){
			$( inputOtherDest ).val( Saver.get("othDest") );
		}
		if( Saver.get("typDest") != undefined ){
			$( selectDestChooser ).val( Saver.get("typDest") );
			$( selectDestChooser ).change();
		}
		if( Saver.get("typeChooser") != undefined ){
			$( typeChooserSelect ).val( Saver.get("typeChooser") );
			$( typeChooserSelect ).change();
		}
	}
	loadLocalStorage();

	/**
	 * Alles leeren Button
	 */
	function clearButtonInit(){
		$( clearButton ).on( "click" , function (){
			setHash("");
			Generator.cleanUp();
			Saver.clear();
			$( inputPasswordElement ).val("");
			$( inputOtherDest ).val("");
			$( selectDestChooser ).val( $( selectDestChooser +  " option" )[0].innerHTML );
			$( typeChooserSelect ).val( $( typeChooserSelect +  " option" )[0].value );

			$( selectDestChooser ).change();
			$( typeChooserSelect ).change();
		});
	}
	clearButtonInit();
}