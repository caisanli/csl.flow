// 内部储存
import React from 'react';
// 基础配置
import Svg from '../Svg'
export default function(props) {
    let {width, height, strokeWidth} = props;
    let x = strokeWidth;
    let y = strokeWidth;
        
    let newWidth = width - strokeWidth;
    let newHeight = height - strokeWidth;
    let offsetWidth = newWidth / 10;
    let offsetHeight = newHeight / 10;
    let graph = `M${ x } ${ y } V${ newHeight } H${ newWidth } V${ y } Z`;

    return (
        <Svg {...props} >
            <path d={graph} ></path>
            <line x1={x + offsetWidth} y1={y} x2={x + offsetWidth} y2={newHeight} />
            <line x1={x} y1={ offsetHeight } x2={newWidth} y2={offsetHeight} />
        </Svg>
    );
}