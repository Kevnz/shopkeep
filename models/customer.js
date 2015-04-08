import ModelBase from './model-base';

export default class CustomerModel extends ModelBase {
	constructor(props) {
        super(props);
    }
    get firstName() {
	    return this._first;
	}
	set firstName(value) {
		this._first = value;
	}
	get lastName() {
	    return this._last;
	}
	set lastName(value) {
		this._last = value;
	}
	get email() {
	    return this._email;
	}
	set email(value) {
		this._email = value;
	}
}