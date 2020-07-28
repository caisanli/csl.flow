// 添加记录
export function addRecord(handle) {
    return {
        type: 'ADD',
        handle
    }
}
// 删除记录
export function spliceRecord(index) {
    return {
        type: 'SPLICE',
        index
    }
}
// 设置当前第几步
export function setStep(step) {
    return {
        type: 'SET',
        step
    }
}