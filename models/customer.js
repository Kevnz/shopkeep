'use strict';
import ModelBase from './model-base';
import schema from './schemas/customer.json';
export default class CustomerModel extends ModelBase {
	constructor(props) {
        super(props, schema);
    }
}