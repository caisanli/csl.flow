// 五边形
import React from 'react';
// 基础配置
import Svg from '../Svg'
import defaultDot, { dotHeight } from '@assets/js/dots';
import {deepClone} from '@assets/js/utils';
let newDefaultDot = deepClone(defaultDot)
export default function(props) {
    let {width, height, strokeWidth, showDot} = props;
    

    let x = strokeWidth;
    let y = strokeWidth;
    // 
    let downOffset = width / 5;
    let upPoint = `${ width / 2 }, ${ y }`;
    let offsetHeight = Math.round(height / 3)
    let leftPoint = `${x}, ${ offsetHeight }`
    let newWidth = width - strokeWidth;
    let newHeigh = height - strokeWidth;

    let rightPoint = `${ newWidth }, ${ offsetHeight }`;
    let downRightPoint = `${ width - downOffset }, ${ newHeigh }`;
    let downLeftPoint = `${ downOffset }, ${ newHeigh }`;
    let graph = `${ leftPoint } ${ upPoint } ${ rightPoint } ${ downRightPoint } ${ downLeftPoint }`;
    let dots = showDot ? [newDefaultDot.tc, Object.assign(newDefaultDot.mr, {
        top: offsetHeight - dotHeight / 2
    }), Object.assign(newDefaultDot.ml, {
        top: offsetHeight - dotHeight / 2
    }), newDefaultDot.bc] : [];   

    return (
        <Svg {...props} dots={dots} >
            <polygon points={graph} />
        </Svg>
    );
}