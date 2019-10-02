'using strict'

function createMutableObject(obj, prop, val) {
    return Object.defineProperty(obj, prop, {
      configurable: true,
      enumerable: true,
      value: val,
      writable: true
    });
}

export {
    createMutableObject
}
