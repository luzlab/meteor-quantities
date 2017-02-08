import { EJSON } from 'meteor/ejson';
import { check } from 'meteor/check';

const type_name = 'js-quantity'

const Qty = require('js-quantities');

function Qty_factory(value) {
  return Qty(value);
};

EJSON.addType(type_name, Qty_factory);

Qty.prototype.typeName = function typeName() {
  return type_name
};

Qty.prototype.toJSONValue = function toJSONValue() {
	let object_definition = {
		scalar: this.scalar,
		numerator : this.numerator,
		denominator : this.denominator
	};
	return object_definition;
};

Qty.prototype.clone = function clone() {
	return new Qty(this);
};

Qty.prototype.equals = function equals(other) {
        if (this.isCompatible(other)) {
                return this.eq(other);
        } else {
                return false;
        }
}

export default Qty;
