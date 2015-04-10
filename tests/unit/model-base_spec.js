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
    it('should allow to be saved', function (done) {
        let model = new TestModel({ modelName:'User'});

        model.save((err, item) => {
            console.log(err)
            assert.ok(item.title === 'Test');
            done();
        });
    });
});