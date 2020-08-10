// 矩形
import React from 'react';
// 基础配置
import Svg from '../Svg'
export default function(props) {
    let {width, height, strokeWidth} = props;
    let x = strokeWidth;
    let y = strokeWidth;
    width -= strokeWidth * 2;
    height -= strokeWidth * 2;
    let id = Date.now() + Math.random();
    return (
        <Svg {...props} >
           <rect id={id} x={x} y={y} width={width} height={height} />
        </Svg>
    );
}