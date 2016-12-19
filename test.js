import Qty from './index.js';
import { EJSON } from 'meteor/ejson';
import { check } from 'meteor/check';
import { chai } from 'meteor/practicalmeteor:chai';

const assert = chai.assert;

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

describe('quantities', function() {
  it('Serialize a Qty to a JSON-ifyable String', function() {
    let qty = Qty('1 m');
    let stringified_qty = EJSON.stringify(qty);
    assert.isString(stringified_qty, 'Qty can be serialized by EJSON');
    let parsed_qty = JSON.parse(stringified_qty);
    assert.isObject(parsed_qty, 'String is a valid JSON');
  });

  it('Deserialize a Qty from an EJSON', function() {
    let qty = Qty('1 m');
    let stringified_qty = EJSON.stringify(qty);
    let parsed_qty = EJSON.parse(stringified_qty);
    assert.instanceOf(parsed_qty, Qty, 'Parsed qty is an instance of Qty');
  });

  it('Send a qty via a Meteor Method', function() {
    let qty = Qty('10 cm');
    Meteor.call('is_qty', qty, (error, result) => {
      if (error) throw new Error('Error calling `is_qty` method');
      assert.isTrue(result);
    });
  });

  it('Compare two quantities', function() {
    let qty1 = Qty('10 cm');
    let qty2 = Qty('0.1 m');
    let qty3 = Qty('1 mile');
    assert.isTrue(EJSON.equals(qty1, qty2), '`10 cm` is equal to `0.1 m`');
    assert.isFalse(EJSON.equals(qty1, qty3), '`10 cm` is not equal to `1 mile`');
  });

  it('Clone a quantity', function() {
    let qty1 = Qty('10 cm');
    let qty2 = EJSON.clone(qty1);
    assert.instanceOf(qty2, Qty, 'Parsed qty is an instance of Qty');
    assert.isTrue(EJSON.equals(qty1, qty2), 'Cloned qty is equal to original');
  });

})
