// 六角形
import React from 'react';
// 基础配置
import Svg from '../Svg'
import defaultDot from '@assets/js/dots';

export default function(props) {

    let {width, height, strokeWidth, showDot} = props;
    let x = strokeWidth;
    let y = strokeWidth;
    // 
    let offset = width / 5;
    let upLeftPoint = `${ offset }, ${ y }`;
    let upRightPoint = `${ width - offset }, ${ y }`
    let newWidth = width - strokeWidth;
    let newHeigh = height - strokeWidth;
    let rightPoint = `${ newWidth }, ${ height / 2 }`;
    let leftPoint = `${ x }, ${ height / 2 }`;
    let downRightPoint = `${ width - offset }, ${ newHeigh }`;
    let downLeftPoint = `${ offset }, ${ newHeigh }`;
    let graph = `${ upLeftPoint } ${ upRightPoint } ${ rightPoint } ${ downRightPoint } ${ downLeftPoint } ${ leftPoint }`;
    let dots = showDot ? [defaultDot.tc, defaultDot.mr, defaultDot.ml, defaultDot.bc] : [];   

    return (
        <Svg {...props} dots={dots} >
            <polygon points={graph} />
        </Svg>
    );
}