import assert from 'assert';
import Customer from '../../models/customer'


describe('Customer model', () => {
    it('should construct a customer', (done) => {
    	let customer = new Customer({firstName: 'Test', lastName:'User'});
    	console.log('customer', customer);
    	console.log(customer.toJson());
    	let jsonOut = customer.toJson();
    	assert.ok(jsonOut.firstName === 'Test');
    	assert.ok(jsonOut._first === undefined);
    	done();
    });
    it('should output only ', (done) => {
    	let customer = new Customer({firstName: 'Test', lastName:'User'});
    	console.log('customer', customer);
    	console.log(customer.toJson());
    	let jsonOut = customer.toJson();
    	assert.ok(jsonOut.firstName === 'Test');
    	assert.ok(jsonOut._first === undefined);
    	done();
    });
});