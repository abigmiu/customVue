import observe from "./observe.js";

export default function defineReactive(target, key, value) {
  // console.log(value)
  observe(value);
  Object.defineProperty(target, key, {
    get() {
      console.log("getter key = ", key);
      return value;
    },
    set(newV) {

      if (newV === value) return;

      value = newV;
      console.log(`setter ${key} = ${value}`);
      observe(value);
      return value;
    },
  });
}

function set(target, key, value) {
  defineReactive(target, key, value);
}
