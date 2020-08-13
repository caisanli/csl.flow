// 跨页引用
import React from 'react';
// 基础配置
import Svg from '../Svg'
import defaultDot from '@assets/js/dots';

export default function(props) {
    let {width, height, strokeWidth, showDot} = props;
    let x = strokeWidth;
    let y = strokeWidth;
        
    let newWidth = width - strokeWidth;
    let newHeight = height - strokeWidth;

    // let offsetWidth = Math.round(newWidth / 5);
    let offsetHeight = Math.round(newHeight / 3);

    let graph = `M${ x } ${ y } H${ newWidth } V${ newHeight - offsetHeight } 
                L${ width / 2 } ${ newHeight }
                L${ x } ${ newHeight - offsetHeight }
                Z`;
    let dots = showDot ? [defaultDot.tc, defaultDot.mr, defaultDot.ml, defaultDot.bc] : [];   

    return (
        <Svg {...props} dots={dots} >
            <path d={graph} strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
    );
}