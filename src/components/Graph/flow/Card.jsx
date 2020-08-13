// 卡片
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
    let offsetHeight = Math.round(height / 5);
    let offsetWidth = Math.round(width / 5);
    let graph = `M${ x } ${ offsetHeight }
                V${ newHeight }
                H${ newWidth }
                V${ y }
                H${ offsetWidth }
                Z`;
    let dots = showDot ? [defaultDot.tc, defaultDot.mr, defaultDot.ml, defaultDot.bc] : [];   

    return (
        <Svg {...props} dots={dots} >
            <path d={graph} />
        </Svg>
    );
}