/**
 * 运行时生成VNode
 * @param target Vue 实例
 */
import VNode from "./vnode.js";

export default function renderHelper(target) {
  target._c = createElement;
  target._v = createTextNode;
}

/**
 * 为指定标签创建虚拟DOM
 * @param tag
 * @param attr
 * @param children
 * @returns {{parent: null, children: *, context: null, tag: *, text: null, attr: *, ele: null}|*}
 */
function createElement(tag, attr, children) {
  return VNode(tag, attr, children, this);
}

/**
 * 创建文本节点的虚拟dom
 * @param textAst
 * @returns {{parent: null, children: *, context: null, tag: *, text: null, attr: *, ele: null}|*}
 */
function createTextNode(textAst) {
  return VNode(null, null, null, this, textAst);
}
