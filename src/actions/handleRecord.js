// 添加记录
export function addRecord(handle) {
    return {
        type: 'ADD',
        handle
    }
}
// 设置当前第几步
export function setStep(step) {
    return {
        type: 'SET',
        step
    }
}