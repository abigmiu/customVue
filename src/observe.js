import Observer from "./Observer.js";

export default function observe(value) {
  if (typeof value !== "object") return;
  return new Observer(value);
}
