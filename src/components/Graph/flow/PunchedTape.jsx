// 条带
import React from 'react';
// 基础配置
import Svg from '../Svg'
import defaultDot, { dotHeight } from '@assets/js/dots';
import { deepClone } from '@assets/js/utils';
export default function(props) {
    let {width, height, strokeWidth, showDot} = props;
    let x = strokeWidth;
    let y = strokeWidth;
        
    let newWidth = width - strokeWidth;
    let newHeight = height - strokeWidth;

    let offsetHeight = Math.round(newHeight / 4.5);

    let graph = `M${ x } ${ offsetHeight / 2 }
                Q${ newWidth / 4 } ${ offsetHeight * 1.46 } ${ newWidth / 2 } ${ offsetHeight / 2 } T${ newWidth } ${ offsetHeight / 2 }
                V${ newHeight - offsetHeight / 2 }
                Q${ newWidth - (newWidth / 4) } ${ newHeight - offsetHeight * 1.5 } ${ newWidth / 2 } ${ newHeight - offsetHeight / 2 } T${ x } ${ newHeight - offsetHeight / 2 }
                Z`;
                
    let dots = showDot ? [deepClone({}, defaultDot.tc, {
        top: offsetHeight / 2 - dotHeight / 2 
    }), defaultDot.mr, defaultDot.ml, deepClone({}, defaultDot.bc, {
        bottom: offsetHeight / 2 - dotHeight / 2 
    })] : [];   

    return (
        <Svg {...props} dots={dots} >
            <path d={graph} />
        </Svg>
    );
}