import protoArgument from "./protoArgument.js";
import defineReactive from "./defineReactive.js";

export default function Observer(value) {
  Object.defineProperty(value, '__ob__', {
    value: this,
    enumerable: false,
    writable: true,
    configurable: true
  })
  if (Array.isArray(value)) {
    protoArgument(value);
  } else {
    this.walk(value);
  }
}
Observer.prototype.walk = function (obj) {
  for (let key in obj) {
    defineReactive(obj, key, obj[key]);
  }
};
