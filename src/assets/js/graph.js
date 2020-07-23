// 图形初始化
export const defaultStyle = {
    fontFamily:  'serif', // 字体
    fontSize: '16', // 文字大小
    bold: 'normal', // 加粗
    italics: 'normal', // 斜体
    underline: 'none', // 下划线
    fontColor: '#303133', // 字体颜色
    align: 'left-middle', // 对齐方式 
    backgroundColor: 'none', // 图形背景颜色
    borderSize: '5', // 图形边框宽度
    borderStyle: '', // 图形边框样式
    lock: false, // 是否锁定
}
export default {
    name: '', // 值
    title: '', // 名称
    comp: '', // 组件
    width: 140,
    height: 140,
    left: 0,
    top: 0,
    x: 0,
    y: 0,
    rotate: 0,
    id: null,
    first: true,
    ...defaultStyle
}
