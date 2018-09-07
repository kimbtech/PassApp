/**
 * PassApp by KIMB-technologies
 * (c) 2018, released unter terms of MIT License
 * https://github.com/kimbtech/PassApp
 */

/**
 * Password generator class
 */
class PassGen{

	constructor(){
		this.SHA512 = new Hashes.SHA512;
		this.RMD160 = new Hashes.RMD160;
		this.cleanUp();
	}

	/**
	 * Generates a password by the masterpassword, with addition if given
	 * @param password the masterpassword
	 * @param addition a addition or empty
	 * @returns the password
	 */
	generate(password, addition){
		if( password == null || typeof password == "undefined" || password == ""  ){
			return "";
		}
		if( typeof addition == "undefined" || addition == null){
			this.input = password;
		}
		else{
			addition = addition.replace( /[^A-Za-z0-9]*/g , "" );
			addition = addition.toLowerCase()
			this.input = password + "<->" +  addition;
		}

		this.hash();
		if( this.output.length > 20 ){
			this.output = this.output.substring(0,20);
		}
		if( this.output.replace( /[A-Za-z0-9]*/g , "" ) == "" || this.output.replace( /[A-Za-z]*/g , "" ) == "" ){
			this.output = this.output.substring(0,5) + "+" + this.output.substring(6,10) + "0" + this.output.substring(11,20); 
		}
		return this.output;
	}

	/**
	 * Hashes the data from input, saves to output.
	 */
	hash(){
		var tmp = this.input;
		for(var i = 0; i < 1000; i++){
			tmp = this.hashSHA( tmp );
		}
		this.output = this.hashRMD( tmp );
	}

	/**
	 * Calculates the SHA512 hash on the given data and gives is back as binary
	 * @param data the data to hash
	 * @returns the hash, raw
	 */
	hashSHA( data ){
		return this.SHA512.raw( data );
	}

	/**
	 * Calculates the RIPEMD160 hash and gives back as base64
	 * @param data the data to hash
	 * @returns the RIPEMD160 hash, base64
	 */
	hashRMD( data ){
		return this.RMD160.b64( data );
	}

	/**
	 * Clear all password data from memory.
	 */
	cleanUp(){
		this.input = null;
		this.result = null;
	}
		
}