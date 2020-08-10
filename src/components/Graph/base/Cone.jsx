// 锥形
import React from 'react';
// 基础配置
import Svg from '../Svg'
export default function(props) {
    let {width, height, strokeWidth} = props;
    let x = strokeWidth;
    let y = strokeWidth;
    
    
    let newWidth = width - strokeWidth;
    let newHeight = height - strokeWidth;
    let middlePoint = `${ width / 2 }, ${ newHeight }`;
    let offsetHeight = 20;
    let offsetWidth = newWidth / 3;
    let graph = `${ x }, ${ offsetHeight / 2 } ${ width / 2 }, ${ newHeight } ${ newWidth }, ${ offsetHeight / 2 }`
    //  C ${ offsetWidth } ${ -20 } ${ newWidth - offsetWidth } ${ -20 } ${ newWidth } ${ offsetHeight } 
    let d = `M${ x } ${ offsetHeight } 
            A ${ newWidth / 2 } ${ offsetHeight } 0 0 1 ${ newWidth } ${ offsetHeight } 
            L ${ middlePoint } L ${ x } ${ offsetHeight }`;
    return (
        <Svg {...props} >
            <path d={d}/>
        </Svg>
    );
}