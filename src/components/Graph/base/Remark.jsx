// 备注
import React from 'react';
// 基础配置
import Svg from '../Svg'
export default function(props) {
    let { width, height } = props;
    // 倒三角的宽高度
    let invertedTriangleWH = 20;
    // 矩形
    let rectGraph = `0, 0 ${ width - invertedTriangleWH }, 0  ${width}, ${ invertedTriangleWH } ${ width }, ${ height } 0, ${ height }`;
    // 倒三角
    let invertedTriangleGraph = `${ width - invertedTriangleWH }, 0 ${width}, ${ invertedTriangleWH } ${ width - invertedTriangleWH }, ${ invertedTriangleWH }`
    return (
        <Svg {...props} >
            <polygon strokeWidth="1" points={ rectGraph } fill="#ffffaa" stroke="#ffffaa"/>
            <polygon strokeWidth="1" points={ invertedTriangleGraph } fill="#cdcd78" stroke="#cdcd78"/>
        </Svg>
    );
}