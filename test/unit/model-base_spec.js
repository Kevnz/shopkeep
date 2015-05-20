'use strict';
import assert from 'assert';
import ModelBase from '../../models/model-base';
let testModelSchema = {
    "id": "/TestModel",
    "type": "object",
    "properties": {
      "modelName": {"type": "string"},
      "title": {"type": "string"}
    },
    "required": ["title"]
};


class TestModel extends ModelBase {
    constructor(props) {
        super(props, testModelSchema);
        
    }
}

describe('Using the model base', () => {
    it('should construct a new object', (done) => {

    	let model = new TestModel({title: 'Test', modelName:'User'});
    	let jsonOut = model.toJson();
    	assert.ok(jsonOut.title === 'Test');
    	assert.ok(jsonOut.modelName === 'User');
    	done();
    });
    it('should output only some of the props', (done) => {
    	let model = new TestModel({title: 'Test', modelName:'User'});
    	let jsonOut = model.toJson(['title']);
    	assert.ok(jsonOut.title === 'Test');
    	assert.ok(jsonOut.modelName === undefined);
    	done();
    });
    it('should not allow an invalid model to be saved', function (done) {
        let model = new TestModel({ modelName:'User'});

        model.save((err, item) => {
            assert.ok(err.length > 0);
            assert.ok(item === null);
            done();
        });
    });
    it('should allow a valid object to be saved', function (done) {
        let model = new TestModel({title: 'Test', modelName:'User'});
        model.save((err, item) => {
            assert.ok(err===null);
            assert.ok(item === model);
            done();
        });
    });
});