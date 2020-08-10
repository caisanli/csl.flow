// 五边形
import React from 'react';
// 基础配置
import Svg from '../Svg'
export default function(props) {
    let {width, height, strokeWidth} = props;
    let x = strokeWidth;
    let y = strokeWidth;
    // 
    let downOffset = width / 5;
    let upPoint = `${ width / 2 }, ${ y }`;
    let leftPoint = `${x}, ${ height / 3 }`
    let newWidth = width - strokeWidth;
    let newHeigh = height - strokeWidth;

    let rightPoint = `${ newWidth }, ${ height / 3 }`;
    let downRightPoint = `${ width - downOffset }, ${ newHeigh }`;
    let downLeftPoint = `${ downOffset }, ${ newHeigh }`;
    let graph = `${ leftPoint } ${ upPoint } ${ rightPoint } ${ downRightPoint } ${ downLeftPoint }`;

    return (
        <Svg {...props} >
            <polygon points={graph} />
        </Svg>
    );
}