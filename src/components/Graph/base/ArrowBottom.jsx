// 下箭头
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

    let WH = Math.round(newWidth / 3);
    let VH = Math.round(newHeight / 2.5);
    let graph = `M${ WH } ${ y }
                H${ WH * 2 }
                V${ newHeight - VH }
                H${ newWidth }
                L${ width / 2 } ${ newHeight }
                L${ x } ${ newHeight - VH }
                H${ WH }
                Z`;
    let dots = showDot ? [defaultDot.tc, defaultDot.bc] : [];   

    return (
        <Svg {...props} dots={dots}>
            <path d={ graph } />
        </Svg>
    );
}