'use strict';
var SchemaValidator = (()  => {
	let instance;
	let jsonschema = require('jsonschema');
	var extra = require('jsonschema-extra');
	
	function createInstance() {
		let Validator = jsonschema.Validator;
  		let v = new Validator();
  		extra(v);
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