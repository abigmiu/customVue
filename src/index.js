import mount from "./compiler/index.js";
import initData from "./init.js";
import renderHelper from "./compiler/renderHelper.js";
import patch from "./compiler/patch.js";

export default function Vue(options) {
  this._init(options);
}

Vue.prototype._init = function (options) {
  this.$options = options;
  initData(this);
  renderHelper(this);
  this.__patch__ = patch;
  if (this.$options.el) {
    this.$mount();
  }
};

Vue.prototype.$mount = function () {
  mount(this);
};
