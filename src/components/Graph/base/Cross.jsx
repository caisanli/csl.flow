// 十字
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
    let HW = Math.round(newWidth / 5);
    let VH = Math.round(newHeight / 5);
    let graph = `M${ x } ${ VH * 2 } 
                H${ HW * 2 } 
                V${ y } 
                H${ HW * 3 } 
                V${ VH * 2 } 
                H${ newWidth } 
                V${ VH * 3 } 
                H${ HW * 3 } 
                V${ newHeight } 
                H${ HW * 2 } 
                V${ VH * 3 }
                H${ x }
                V${ VH * 2 }`;
    let dots = showDot ? [defaultDot.tc, defaultDot.mr, defaultDot.ml, defaultDot.bc] : [];   

    return (
        <Svg {...props} dots={dots} >
            <path d={ graph } />
        </Svg>
    );
}