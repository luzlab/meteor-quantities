import { EJSON } from 'meteor/ejson';
import { check } from 'meteor/check';

const type_name = 'js-quantity'

const Qty = require('js-quantities');

function Qty_factory(value) {
  return Qty(value);
}

EJSON.addType(type_name, Qty_factory)

Qty.prototype.typeName = function typeName() {
  return type_name
};

Qty.prototype.toJSONValue = function toJSONValue() {
	return this.toString();;
};

Qty.prototype.clone = function clone() {
	return new Qty(this);
};

Qty.prototype.equals = function equals(qty) {
	return this.eq(qty);
};

export default Qty;