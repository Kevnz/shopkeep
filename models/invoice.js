'use strict';

import ModelBase from './model-base';
import schema from './schemas/invoice.json';

export default class InvoiceModel extends ModelBase {
	constructor(props) {
        super(props, schema);
    }
}