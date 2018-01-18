import Qty from 'js-quantities';
import extras from 'ejson-extras';

// The Qty custom type is now provided by the ejson-extras library.
extras.apply();

// This makes debugging/logging of Qty objects a lot easier.
Qty.prototype.inspect = Qty.prototype.toString;

export default Qty;
