/**
 * 数组响应式
 */
const arrayProto = Array.prototype
const arrayMethods = Object.create(arrayProto)

// 改变了数组本身
const methodsToPatch = [
    'push',
    'pop',
    'unshift',
    'shift',
    'splice',
    'sort',
    'reverse'
]
methodsToPatch.forEach(method => {
    Object.defineProperty(arrayMethods, method, {
        value: function (...args) {
            const ret = arrayProto[method].apply(this, args)
            console.log('array reactive')
            return ret
        },
        configurable: true,
        writable: true,
        enumerable: false,
    })
})

export default function protoArgument (ary) {
    ary.__proto__ = arrayMethods
}
