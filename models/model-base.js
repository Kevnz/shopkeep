'use strict';
export default class ModelBase {
    constructor(props) {
        this._schema = {};
        for (let prop in props) {
            this[prop] = props[prop];
            this._schema[prop] = null;
        }
        for (let prop in props) {
            this[prop] = props[prop];
        }
    }
    save(callback) {
      console.log('save')  ;
      callback(true, null);
    }
    toJson(schema) {
        schema = schema || Object.getOwnPropertyNames(this);
        console.log(schema);
        var output = { };
        for (var i = 0; i < schema.length; i++) {
            output[schema[i]] = this[schema[i]];
        }
        return output;
    }
}