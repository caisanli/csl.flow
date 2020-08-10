// 三角形
import React from 'react';
// 基础配置
import Svg from '../Svg'
export default function(props) {
    let {width, height, strokeWidth} = props;
    let x = strokeWidth;
    let y = strokeWidth;
    let startPoint = `${ width / 2 }, ${ y }`;
    width -= strokeWidth;
    height -= strokeWidth;
    let graph = `${ startPoint } ${ width }, ${ height } ${ x }, ${ height }`;
    return (
        <Svg {...props} >
            <polygon points={ graph } />
        </Svg>
    );
}