export default class ModelBase {
	constructor(props) {
		this._schema = {};
		for (let prop in props) {
			this[prop] = props[prop];
			this._schema[prop] = null;
		}
        super(props);
    }
    toJson(schema) {
    	schema = schema || this._schema;
    	console.log(schema)
    	var output = { };
    	for (let prop in schema) {
    		console.log(prop)
    		output[prop] = this[prop];
    	}
    	return output;
    }
}