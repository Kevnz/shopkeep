'use strict';
import assert from 'assert';
import ModelBase from '../../models/model-base';

class TestModel extends ModelBase {
    constructor(props) {
        super(props);
    }
    get modelName() {
        return this._name;
    }
    set modelName(value) {
        this._name = value;
    }
    get title() {
        return this._title;
    }
    set title(value) {
        this._title = value;
    }
    get getOnly(value) {
        this._title = value;
    }
}

describe('Using the model base', () => {
    it('should construct a new object', (done) => {

    	let model = new TestModel({title: 'Test', modelName:'User'});
        console.log('the model', model);
        console.log(Object.getOwnPropertyNames(TestModel));
        console.log(TestModel.name);
        console.log('Object.keys', Object.keys(model));
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
        let model = new TestModel({title: 'Test', modelName:'User'});

        model.save(() => {
            assert.ok(this.title === 'Test');
            done();
        });
    });
});