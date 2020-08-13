// 三角形
import React from 'react';
// 基础配置
import Svg from '../Svg'
import defaultDot, { dotWidth } from '@assets/js/dots';

export default function(props) {
    let {width, height, strokeWidth, showDot} = props;
    let x = strokeWidth;
    let y = strokeWidth;
    let offsetWidth = width / 2;
    let startPoint = `${ offsetWidth }, ${ y }`;
    width -= strokeWidth;
    height -= strokeWidth;
    let graph = `${ startPoint } ${ width }, ${ height } ${ x }, ${ height }`;
    let dots = showDot ? [defaultDot.tc, Object.assign(defaultDot.mr, {
        right: offsetWidth / 2 - dotWidth / 2
    }), Object.assign(defaultDot.ml, {
        left: offsetWidth / 2 - dotWidth / 2
    }), defaultDot.bc] : [];  
    return (
        <Svg {...props} dots={dots} >
            <polygon points={ graph } />
        </Svg>
    );
}