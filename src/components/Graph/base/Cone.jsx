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
    let offsetHeight = Math.round(newHeight / 5);
    let offsetWidth = Math.round(newWidth / 3);

    let d = `M${ x } ${ offsetHeight } 
            C ${ offsetWidth } ${ -offsetHeight / 3.49 } ${ newWidth - offsetWidth } ${ -offsetHeight / 3.49 } ${ newWidth } ${ offsetHeight } 
            L ${ middlePoint } L ${ x } ${ offsetHeight }`;
    return (
        <Svg {...props} >
            <path d={d}/>
        </Svg>
    );
}