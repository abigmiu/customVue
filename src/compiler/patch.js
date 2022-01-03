/**
 * 负责初始渲染和后续更新
 * @param oldVnode
 * @param vnode
 */
export default function patch(oldVnode, vnode) {
  if (oldVnode && !vnode) {
    // 组件销毁
    return;
  }
  if (!oldVnode) {
    // 首次渲染
  } else {
    if (oldVnode.nodeType) {
      // 说明是真实节点， 表示首次渲染根组件
      const parent = oldVnode.parentNode;
      const referNode = oldVnode.nextSibling;
      // 将vnode变成真实节点， 并添加到父节点
      createEle(vnode, parent, referNode);
      // 移除老的节点
      parent.removeChild(oldVnode);
    } else {
      console.log("update");
    }
  }
}

function createEle(vnode, parent, referNode) {
  // 在vnode上记录parent, 创建子组件用
  vnode.parent = parent;
  // 判断是不是子组件
  if (createComponent(vnode)) return;

  const { tag, attr, children, text } = vnode;

  if (text) {
    // 文本节点
    // 创建文本节点， 并插入到父节点内
    vnode.elm = createTextNode(vnode);
  } else {
    // 普通的元素节点
    vnode.elm = document.createElement(tag);
    setAttribute(vnode.attr, vnode);

    for (let i = 0, len = children.length; i < len; i++) {
      createEle(children[i], vnode.elm);
    }
  }

  // 节点创建完， 将创建的节点插入到父节点
  if (parent) {
    const elm = vnode.elm;
    if (referNode) {
      parent.insertBefore(elm, referNode);
    } else {
      parent.appendChild(elm);
    }
  }
}

function createComponent() {}

function createTextNode(textVnode) {
  let { text } = textVnode;
  let textNode = null;
  if (text.expression) {
    const value = textVnode.context[text.expression];
    textNode = document.createTextNode(
      typeof value === "object" ? JSON.stringify(value) : value
    );
  } else {
    textNode = document.createTextNode(text.text);
  }

  return textNode;
}

function setAttribute(attr, vnode) {
  for (let name in attr) {
    if (name === "vModel") {
      // setVModel();
    } else if (name === "vBind") {
    } else if (name === "vOn") {
    } else {
      vnode.elm.setAttribute(name, attr[name]);
    }
  }
}

function setVModel(tag, value, vnode) {
  const { context: vm, elm } = vnode;
  if (tag === "select") {
    elm.value = vm[value];
    elm.addEventListener("change", function () {
      vm[value] = elm.value;
    });
  } else if (tag === "input" && vnode.elm.type === "text") {
  } else if (tag === "input" && vnode.elm.type === "checkbox") {
  }
}

function setVBind() {}

function setVOn() {}
