// APQC
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

    let offsetHeight = newHeight / 6;

    let graph = `M${ x } ${ offsetHeight }
                C${ newWidth / 4 } ${ -offsetHeight / 3.49 } ${ newWidth - newWidth / 4 } ${ -offsetHeight / 3.49 } ${ newWidth } ${ offsetHeight }
                V${ newHeight }
                H${ x }
                Z`;
    let dots = showDot ? [defaultDot.tc, defaultDot.mr, defaultDot.ml, defaultDot.bc] : [];   

    return (
        <Svg {...props} dots={dots}>
            <path d={graph} />
        </Svg>
    );
}