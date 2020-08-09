// 菱形
import React from 'react';
// 基础配置
import Svg from '../Svg'
export default function(props) {
    let {width, height, strokeWidth} = props;
    let x = strokeWidth - 1;
    let y = strokeWidth - 1;
    let upPoint = `${ width / 2 }, ${ y }`;
    let leftPoint = `${x}, ${ height / 2 }`
    
    let newWidth = width - strokeWidth * 2;
    let newHeigh = height - strokeWidth * 2;
    newWidth += 2
    newHeigh += 2;
    let rightPoint = `${ newWidth }, ${ height / 2 }`;
    let downPoint = `${ width / 2 }, ${ newHeigh }`;
    let graph = `${ rightPoint } ${ upPoint } ${ leftPoint } ${ downPoint }`;
    return (
        <Svg {...props} >
            <polygon points={ graph } />
        </Svg>
    );
}