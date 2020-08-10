// 菱形
import React from 'react';
// 基础配置
import Svg from '../Svg'
export default function(props) {
    let {width, height, strokeWidth} = props;
    let x = strokeWidth;
    let y = strokeWidth;
    let upPoint = `${ width / 2 }, ${ y }`;
    let leftPoint = `${x}, ${ height / 2 }`
    
    let newWidth = width - strokeWidth;
    let newHeigh = height - strokeWidth;

    let rightPoint = `${ newWidth }, ${ height / 2 }`;
    let downPoint = `${ width / 2 }, ${ newHeigh }`;
    let graph = `${ rightPoint } ${ upPoint } ${ leftPoint } ${ downPoint }`;
    return (
        <Svg {...props} >
            <polygon points={ graph } />
        </Svg>
    );
}