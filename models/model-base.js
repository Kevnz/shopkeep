'use strict';
import SchemaValidator from '../lib/schema-validator';

let v = SchemaValidator.getInstance();

export default class ModelBase {
    constructor(props, schema) {
        this._schema = schema || {};
        v.addSchema(this._schema); 
        for (let prop in props) {
            this[prop] = props[prop];
        } 
    }
    save(callback) {
        var validationResponse = v.validate(this, this._schema);
        if (validationResponse.errors.length > 0) {
            callback(validationResponse.errors, null);
        } else {
            callback(null, this);
        }
        
    }
    toJson(schema) {
        schema = schema || Object.keys(this._schema.properties);
        var output = { };
        for (var i = 0; i < schema.length; i++) {
            output[schema[i]] = this[schema[i]];
        }
        return output;
    }
}