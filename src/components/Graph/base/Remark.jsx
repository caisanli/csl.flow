// 备注
import React from 'react';
// 基础配置
import Svg from '../Svg'
import defaultDot from '@assets/js/dots';

export default function(props) {
    let { width, height, showDot} = props;
    // 倒三角的宽高度
    let invertedTriangleWH = 20;
    // 矩形
    let rectGraph = `0, 0 ${ width - invertedTriangleWH }, 0  ${width}, ${ invertedTriangleWH } ${ width }, ${ height } 0, ${ height }`;
    // 倒三角
    let invertedTriangleGraph = `${ width - invertedTriangleWH }, 0 ${width}, ${ invertedTriangleWH } ${ width - invertedTriangleWH }, ${ invertedTriangleWH }`
    let dots = showDot ? [defaultDot.tc, defaultDot.mr, defaultDot.ml, defaultDot.bc] : [];   

    return (
        <Svg {...props} dots={dots} >
            <polygon strokeWidth="1" points={ rectGraph } fill="#ffffaa" stroke="#ffffaa"/>
            <polygon strokeWidth="1" points={ invertedTriangleGraph } fill="#cdcd78" stroke="#cdcd78"/>
        </Svg>
    );
}