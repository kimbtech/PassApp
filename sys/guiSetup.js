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
	}
	guiSetup_setHash = setHash;

	/**
	 * Change gui, if hash type changed
	 */
	function typeChooserInit(){
		$( typeChooserSelect ).on( "change", function ( e ){
			switch ( $( typeChooserSelect ).val() ) {
				case "justPass":
					$("select#destChooser").addClass("hidden");
					$("input#secondPart").addClass("hidden");
					break;
				case "typDest":
					$("select#destChooser").removeClass("hidden");
					$("input#secondPart").addClass("hidden");
					break;
				case "othDest":
					$("select#destChooser").addClass("hidden");
					$("input#secondPart").removeClass("hidden");
					break;
			}
			Saver.set( $( typeChooserSelect ).val(), "typeChooser" );
		});
	}
	typeChooserInit();
}