'use strict';

import ModelBase from './model-base';
import schema from './schemas/cart.json';

export default class CartModel extends ModelBase {
	constructor(props) {
        super(props, schema);
    }
}