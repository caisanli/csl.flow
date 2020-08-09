// 六角形
import React from 'react';
// 基础配置
import Svg from '../Svg'
export default function(props) {

    let {width, height, strokeWidth} = props;
    let x = strokeWidth - 1;
    let y = strokeWidth - 1;
    // 
    let offset = width / 5;
    let upLeftPoint = `${ offset }, ${ y }`;
    let upRightPoint = `${ width - offset }, ${ y }`
    let newWidth = width - strokeWidth * 3;
    let newHeigh = height - strokeWidth;
    newWidth += strokeWidth * 2;
    newHeigh += strokeWidth * 0.5;
    let rightPoint = `${ newWidth }, ${ height / 2 }`;
    let leftPoint = `${ x }, ${ height / 2 }`;
    let downRightPoint = `${ width - offset }, ${ newHeigh }`;
    let downLeftPoint = `${ offset }, ${ newHeigh }`;
    let graph = `${ upLeftPoint } ${ upRightPoint } ${ rightPoint } ${ downRightPoint } ${ downLeftPoint } ${ leftPoint }`;

    return (
        <Svg {...props} >
            <polygon points={graph} />
        </Svg>
    );
}