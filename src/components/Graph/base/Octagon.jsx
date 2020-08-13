// 八角形
import React from 'react';
// 基础配置
import Svg from '../Svg'
import defaultDot from '@assets/js/dots';

export default function(props) {
    let {width, height, strokeWidth, showDot} = props;
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
    let dots = showDot ? [defaultDot.tc, defaultDot.mr, defaultDot.ml, defaultDot.bc] : [];   

    return (
        <Svg {...props} dots={dots} >
            <polygon points={graph} />
        </Svg>
    );
}