import Qty from './index.js';
import { EJSON } from 'meteor/ejson';
import { check } from 'meteor/check';

if (Meteor.isServer) {
  Meteor.methods({
    'is_10cm': function is_10cm(qty) {
      let ten_cm = Qty('10 cm');
      return qty.eq(ten_cm);
    },
    'is_qty': function is_qty(data) {
      return data instanceof Qty;
    }
  })
}

Tinytest.add('Serialize a Qty to a JSON-ifyable String', function(test) {
  let qty = Qty('1 m');
  let stringified_qty = EJSON.stringify(qty);
  test.isUndefined(check(stringified_qty, String), 'Qty can be stringified by EJSON');
  let parsed_qty = JSON.parse(stringified_qty);
  test.isUndefined(check(parsed_qty, Object), 'String can be parsed to a valid JSON');
});

Tinytest.add('Deserialize a Qty from an EJSON', function(test) {
  let qty = Qty('1 m');
  let stringified_qty = EJSON.stringify(qty);
  let parsed_qty = EJSON.parse(stringified_qty);
  test.instanceOf(parsed_qty, Qty, 'Parsed qty is an instance of Qty');
});

Tinytest.addAsync('Send a qty via a Meteor Method', function(test, onComplete) {
  let qty = Qty('10 cm');
  Meteor.call('is_qty', qty, (error, result) => {
    if (error) throw new Error('Error calling `is_qty` method');
    test.isTrue(result);
    onComplete();
  });
});

Tinytest.add('Compare two quantities', function(test) {
  let qty1 = Qty('10 cm');
  let qty2 = Qty('0.1 m');
  let qty3 = Qty('1 mile');
  test.isTrue(EJSON.equals(qty1, qty2), '`10 cm` is equal to `0.1 m`');
  test.isFalse(EJSON.equals(qty1, qty3), '`10 cm` is not equal to `1 mile`');
});

Tinytest.add('Compare two incompatible quantities', function(test) {
  let qty1 = Qty('1 cm');
  let qty2 = Qty('1 C');
  test.isFalse(EJSON.equals(qty1, qty2), '`1 cm` is not equal to `1 C`');
});

Tinytest.add('Clone a quantity', function(test) {
  let qty1 = Qty('10 cm');
  let qty2 = EJSON.clone(qty1);
  test.instanceOf(qty2, Qty, 'Parsed qty is an instance of Qty');
  test.isTrue(EJSON.equals(qty1, qty2), 'Cloned qty is equal to original');
});
