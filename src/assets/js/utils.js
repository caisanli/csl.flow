
/**
 * 获取元素的绝对top left
 * @param {*} elem 
 */
export function getOffset(elem) {
    let top = elem.offsetTop;
    let left = elem.offsetLeft;
    let parent = elem.offsetParent;
    while(parent !== null) {
        top += parent.offsetTop;
        left += parent.offsetLeft;
        parent = parent.offsetParent;
    }
    return { top, left }
}
/**
 * 是否是父元素
 * @param {*} arg 
 */
export function getParent(node, parentSelectors) {
    let targetParent = document.querySelector(parentSelectors);
    let parent = node.parentNode;
    while(parent !== targetParent && parent !== null) {
        parent = parent.parentNode;
    }
    return parent;
}

export function clone(obj) {
    if(typeof obj !== 'object') 
        return obj;
    let newObj = {};
    for (const key in obj) {
        if (object.hasOwnProperty(key)) {
            newObj[key] = object[key];
        }
    }
    return newObj;
}
function _forEach(arr, callback) {
    const len = arr.length;
    let index = -1;
    while(++index < len) {
        callback(arr[index], index);
    }
}
function _deepClone(newTarget, target, map = new Map()) {
    if(typeof target === 'object') {
        const isArray = Array.isArray(target);
        newTarget = isArray ? [] : newTarget;
        if(map.get(target)) {
             return map.get(target);
        }
        map.set(target, newTarget);
        const keys = isArray ? null : Object.keys(target);
        _forEach(keys || target, (val, key) => {
            if(!isArray) 
                key = val;
            newTarget[key] = _deepClone(newTarget, target[key], map);
        });
        return newTarget;
    } else  {
        return target;
    }
}
// 深拷贝
export function deepClone(...args) {
    let newObj = Object.assign(...args);
    return JSON.parse(JSON.stringify(newObj));
}

// 取对象交集
export function interObject(obj1, obj2) {
    let obj = {};
    if(!obj1||!obj2) return obj;
    for (const key in obj1) {
        if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
            obj[key] = obj2[key] || obj1[key];
        }
    }
    return obj;
}