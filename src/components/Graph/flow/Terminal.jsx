// 开始、结束
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

    let offsetWidth = Math.round(newWidth / 8);

    let graph = `M${x + offsetWidth} ${ y } H${ newWidth - offsetWidth }
                C${ (newWidth + offsetWidth) / 1.08 } ${ height / 4 } ${ (newWidth + offsetWidth) / 1.08 } ${ height - (height / 4) } ${ newWidth - offsetWidth } ${ newHeight }
                H${ x + offsetWidth }
                C${ -offsetWidth / 3.48 } ${ height - (height / 4) } ${ -offsetWidth / 3.48 } ${ height / 4 } ${x + offsetWidth} ${ y }`;
                let dots = showDot ? [defaultDot.tc, defaultDot.mr, defaultDot.ml, defaultDot.bc] : [];   

    return (
        <Svg {...props} dots={dots} >
            <path d={graph} strokeLinecap="round" strokeLinejoin="round"></path>
        </Svg>
    );
}