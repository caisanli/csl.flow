// 五角星
import React from 'react';
// 基础配置
import Svg from '../Svg'
export default function(props) {
    let { width, height, strokeWidth } = props;
    let x = strokeWidth, y = strokeWidth;
    let newWidth = width - strokeWidth;
    let newHeight = height - strokeWidth;
    let offsetWidth = newWidth / 8;
    let offsetHeight = newHeight / 3;
    let onePoint = `${ width / 2 }, ${ y }`;
    let twoPoint = `${ newWidth - newWidth / 3 }, ${ offsetHeight }`;
    let threePoint = `${ newWidth }, ${ offsetHeight }`;
    let fourPoint = `${ newWidth - newWidth / 4 }, ${ newHeight / 1.7 }`;
    let fivePoint = `${ newWidth - offsetWidth }, ${ newHeight }`;
    let sixPoint = `${ width / 2 }, ${ newHeight / 1.4 }`;
    let sevenPoint = `${ offsetWidth }, ${ newHeight }`;
    let eightPoint = `${ newWidth / 4 }, ${  newHeight / 1.7 }`;
    let ninePoint = `${ x }, ${ offsetHeight }`
    let tenPoint = `${ newWidth / 3 }, ${ offsetHeight }`;
    let graph = `${ onePoint } ${ twoPoint } ${ threePoint } ${ fourPoint } ${ fivePoint } ${ sixPoint } ${ sevenPoint } ${ eightPoint } ${ninePoint} ${ tenPoint }`;
    return (
        <Svg {...props} >
            <polygon x={x} y={y} points={graph} />
        </Svg>
    );
}