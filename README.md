# FATHOM:Quantities

This packages add support to Meteor for using numbers with phyiscal units. This package Meteor-izes the [js-quantities npm module](https://www.npmjs.com/package/js-quantities), adding the necessary methods to support serialization and deserialization by Meteor. This allows the use of quanties in publications, Meteor methods and arguments.

# Example usage

```
import Qty from 'meteor/fathom:quantities';

if (Meteor.isServer) {
    Meteor.methods({
      'is_10cm': function is_10cm(qty) {
            let ten_cm = Qty('10 cm');
            let result = qty.eq(ten_cm);
            return result;
        }
    );
}

let qty2 = Qty('0.1 m');
Meteor.call('is_10cm', qty2) // returns true

let weight = Qty('1.1 g');
let volume = Qty('1 cm^3');
let density = weight.div(volume);

let sample_volume = Qty('0.1 m^3');
let sample_weight = sample_volume.add(density); // returns QtyError 'Incompatible units'
let sample_weight = sample_volume.div(density); // Note - we should multiple, not divide, by density
sample_weight.toString('kg'); // returns QtyError 'Incompatible units' since we dividied by density...

let sample_weight = sample_volume.mul(density); // Do the right operation with density
sample_weight.toString('kg'); // returns '110 g' // Now these work as expected
sample_weight.toString('lb'); // returns the '242.50848840336533 lb'
sample_weight.toString('lb', 2); // returns the '242.51 lb'
sample_weight.toString('m'); // returns QtyError 'Incompatible units'
```

This package uses the npm module [`ejson-extras`](https://www.npmjs.com/package/ejson-extras) to registers a custom EJSON type for Qty objects. In addition, this package extends Qty.prototype to provide readable output when logging. Altogether, the Qty.prototype is extended with the following methods:

* .typeName() - returns 'js-quantity'
* .toJSONValue() - returns a JSON-ifyable string
* .clone() - Returns a new Qty object equal to the argument.
* .equals() - defers to Qty.eq() method if units are compatible; false otherwise
* .inspect() - returns human-readable representation of the Qty (eg. "12.1 m") instead of dumping the internal JSON representation.

# Changelog

1.0.5 Added missing test dependancies
