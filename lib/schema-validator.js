'use strict';
var SchemaValidator = (()  => {
	let instance;
	 
	function createInstance() {
		let Validator = require('jsonschema').Validator;
  		let v = new Validator();
		return v;
	}
 
	return {
		getInstance: function () {
			if (instance  === undefined) {
				instance = createInstance();
			}
			return instance;
		}
	};
})();

export default SchemaValidator;