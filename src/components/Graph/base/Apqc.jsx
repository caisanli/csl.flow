// APQC
import React from 'react';
// 基础配置
import Svg from '../Svg'
export default function(props) {
    let {width, height, strokeWidth} = props;
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
    return (
        <Svg {...props} >
            <path d={graph} />
        </Svg>
    );
}