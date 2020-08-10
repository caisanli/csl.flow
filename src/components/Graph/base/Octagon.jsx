// 八角形
import React from 'react';
// 基础配置
import Svg from '../Svg'
export default function(props) {
    let {width, height, strokeWidth} = props;
    let x = strokeWidth;
    let y = strokeWidth;
    // 
    let offsetWidth = width / 4;
    let offsetHeight = height / 4;
    let upLeftPoint = `${ offsetWidth }, ${ y }`;
    let upRightPoint = `${ width - offsetWidth }, ${ y }`
    let newWidth = width - strokeWidth;
    let newHeigh = height - strokeWidth;
    // newWidth += strokeWidth;
    // newHeigh += strokeWidth;
    let middleUpRightPoint = `${ newWidth }, ${ offsetHeight }`;
    let middleDownRightPoint = `${ newWidth }, ${ height - offsetHeight }`;
    let middleUpLeftPoint = `${ x }, ${ offsetHeight }`;
    let middleDownLeftPoint = `${ x }, ${ height - offsetHeight }`;
    let downRightPoint = `${ width - offsetWidth }, ${ newHeigh }`;
    let downLeftPoint = `${ offsetWidth }, ${ newHeigh }`;
    let graph = `${ upLeftPoint } ${ upRightPoint } ${ middleUpRightPoint } ${ middleDownRightPoint } ${ downRightPoint } ${ downLeftPoint } ${ middleDownLeftPoint } ${ middleUpLeftPoint }`;

    return (
        <Svg {...props} >
            <polygon points={graph} />
        </Svg>
    );
}