// 圆角矩形
import React from 'react';
// 基础配置
import Svg from '../Svg'
import defaultDot from '@assets/js/dots';

export default function(props) {
    let {width, height, strokeWidth, showDot} = props;
    let x = strokeWidth;
    let y = strokeWidth;
    width -= strokeWidth * 2;
    height -= strokeWidth * 2;
    let radius = 5;
    let dots = showDot ? [defaultDot.tc, defaultDot.mr, defaultDot.ml, defaultDot.bc] : [];   
    return (
        <Svg {...props} dots={dots}>
            <rect x={x} y={y} width={width} height={height} rx={radius} ry={radius} />
        </Svg>
    );
}