// 文档
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

    let offsetHeight = Math.round(newHeight / 3);

    let graph = `M${ x } ${ y } H${ newWidth } 
                V${ newHeight - offsetHeight / 2 }
                Q${ newWidth - (newWidth / 4) } ${ newHeight - offsetHeight * 1.5 } ${ newWidth / 2 } ${ newHeight - offsetHeight / 2 } T${ x } ${ newHeight - offsetHeight / 2 }
                Z`;
    let dots = showDot ? [defaultDot.tc, defaultDot.mr, defaultDot.ml, Object.assign(defaultDot.bc, {
        bottom: offsetHeight / 2 - dotHeight / 2
    })] : [];   

    return (
        <Svg {...props} dots={dots} >
            <path d={graph} />
        </Svg>
    );
}