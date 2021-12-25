/**
 * 是否为自闭合标签
 * @param {} tagName 
 */
export function isUnaryTag(tagName) {
  return ['input'].includes(tagName) || ['textarea'].includes(tagName)
}