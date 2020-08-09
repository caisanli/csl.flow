// 圆角矩形
import React from 'react';
// 基础配置
import Svg from '../Svg'
export default function(props) {
    let {width, height, strokeWidth} = props;
    let x = strokeWidth - 1;
    let y = strokeWidth - 1;
    width -= strokeWidth * 2;
    height -= strokeWidth * 2;
    width += 2
    height += 2;
    let radius = 5;
    return (
        <Svg {...props} >
            <rect x={x} y={y} width={width} height={height} rx={radius} ry={radius} />
        </Svg>
    );
}