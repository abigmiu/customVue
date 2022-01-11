import Dep from "./Dep.js";
export default function Watcher(cb, options = {}, vm = null) {
  this._cb = cb;
  this.options = options;
  this.vm = vm;
  this.dirty = true;
  this.value = null;
  !options.lazy && this.get();
}

Watcher.prototype.get = function () {
  Dep.target = this;
  this.value = this._cb.apply(this.vm);
  Dep.target = null;
};
Watcher.prototype.update = function () {
  this._cb();
  this.dirty = true;
};
Watcher.prototype.evaluate = function () {
  this.get();
  this.dirty = false;
};
