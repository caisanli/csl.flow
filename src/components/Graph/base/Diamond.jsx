// 菱形
import React from 'react';
// 基础配置
import Svg from '../Svg'
import defaultDot from '@assets/js/dots';

export default function(props) {
    let {width, height, strokeWidth, showDot} = props;
    let x = strokeWidth;
    let y = strokeWidth;
    let upPoint = `${ width / 2 }, ${ y }`;
    let leftPoint = `${x}, ${ height / 2 }`
    
    let newWidth = width - strokeWidth;
    let newHeigh = height - strokeWidth;

    let rightPoint = `${ newWidth }, ${ height / 2 }`;
    let downPoint = `${ width / 2 }, ${ newHeigh }`;
    let graph = `${ rightPoint } ${ upPoint } ${ leftPoint } ${ downPoint }`;
    let dots = showDot ? [defaultDot.tc, defaultDot.mr, defaultDot.ml, defaultDot.bc] : [];   

    return (
        <Svg {...props} dots={dots} >
            <polygon points={ graph } />
        </Svg>
    );
}