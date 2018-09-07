/**
 * PassApp by KIMB-technologies
 * (c) 2018, released unter terms of MIT License
 * https://github.com/kimbtech/PassApp
 */

/**
 * Class to save data in localStorage.
 * Internally uses JSON, so only JSONable data can be saved and can be loaded.
 */
class DataSaver{

	/**
	 * Loading the data from localStorage
	 */
	constructor(){
		var d = localStorage.getItem("DataSaver");
		if( d != null && typeof d != "undefined" && d != "" ){
			try{
				this.data = JSON.parse(d);
			} catch (error) {
				this.data = {};	
			}
		}
		if( this.data == null || typeof this.data == "undefined" ){
			this.data = {};
		}
	}

	/**
	 * Getting the data under key param
	 * @param param the key of the value, if null, all data
	 * @returns the data
	 */
	get( param ){
		if( this.data == null ){
			return null;
		}
		else{
			if( param != null ){
				return this.data[param];
			}
			else{
				return this.data
			}
		}
	}

	/**
	 * Writes the data to the storage, overwrites existing data, if param null, all data
	 * @param data the data to save
	 * @param param the key where to save, if null, all will be overwritten
	 */
	set( data, param){
		if( param != null ){
			this.data[param] = data;
		}
		else {
			this.data = data;
		}

		localStorage.setItem("DataSaver", JSON.stringify( this.data ) );
	}

	/**
	 * Clearing all data.
	 */
	clear(){
		this.data = {};
		localStorage.setItem("DataSaver", null);
	}
}

