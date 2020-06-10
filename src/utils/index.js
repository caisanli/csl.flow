
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