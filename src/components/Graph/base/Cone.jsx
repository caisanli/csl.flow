// 锥形
import React from 'react';
// 基础配置
import Svg from '../Svg'
import defaultDot, { dotHeight } from '@assets/js/dots';

export default function(props) {
    let {width, height, strokeWidth, showDot} = props;
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
    let dots = showDot ? [defaultDot.tc, Object.assign(defaultDot.mr, {
        top: offsetHeight - dotHeight / 2,
    }), Object.assign(defaultDot.ml, {
        top: offsetHeight - dotHeight / 2
    }), defaultDot.bc] : [];   

    return (
        <Svg {...props} dots={dots} >
            <path d={d}/>
        </Svg>
    );
}