
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
// 深拷贝
export function deepClone(obj) {
    if(typeof obj !== 'object') 
        return obj;
    const isArray = Array.isArray(obj);
    let newObj = isArray ? [] : {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = deepClone(obj[key]);
        }
    }
    return newObj;
}