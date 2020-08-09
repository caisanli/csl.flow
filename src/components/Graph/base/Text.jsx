// 文本
import React from 'react';
// 基础配置
import Svg from '../Svg'
export default function(props) {
    let {width, height} = props;
    // 中间柱的宽度
    let barWidth = width / 6;
    // 上方的横线
    let upLine = `M0 0 H ${width}`;
    // 勾的宽度
    let hookWidth = Math.round(width / 7);
    // 勾的高度
    let hookHeight = Math.round(height / 7);
    // 左右两边的宽
    let RLWidth = Math.round((width - hookWidth * 2 - barWidth) / 2);
    // 右边的勾
    let rightHook = `V${ Math.round(height / 4) } L${ width - hookWidth } ${ hookHeight }`
    // 右边的横线点
    let rightPoint = width - hookWidth - RLWidth;
    let rightHLine = `H${ rightPoint }`;
    let rightVLine = `V${ height }`;
    // 左边横线点
    let leftPoint = width -  RLWidth - hookWidth - barWidth;
    // 下方的图形
    let downGraph = `H${ leftPoint }`;
    // 左边竖线
    let leftVLine = `V${ hookHeight }`
    // 左边横线
    let leftHLine = `H${ hookWidth }`
    // 左边的勾
    let leftHook = `L0 ${ Math.round(height / 4) } H0`
    let d = `${ upLine } ${ rightHook } ${ rightHLine } ${ rightVLine } ${ downGraph } ${ leftVLine } ${ leftHLine } ${ leftHook }`
    return (
        <Svg {...props} >
            <path stroke="#000" fill="#000" d={d} />
        </Svg>
    );
}