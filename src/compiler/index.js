import compileToFunction from "./compileToFunction.js"
export default function mount(vm) {
  if (!vm.$options.render) {
    let templateEl = ''

    if (vm.$options.template) {
      templateEl = vm.$options.template
    } else if (vm.$options.el) {
      templateEl = vm.$el = document.querySelector(vm.$options.el).outerHTML
    }

    // 生产渲染函数
    const render = compileToFunction(templateEl)
    vm.$options.render = render
  }
}