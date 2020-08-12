// 展示
import React from 'react';
// 基础配置
import Svg from '../Svg'
export default function(props) {
    let {width, height, strokeWidth} = props;
    let x = strokeWidth;
    let y = strokeWidth;
        
    let newWidth = width - strokeWidth;
    let newHeight = height - strokeWidth;

    let arrowWidth = Math.round(newWidth / 6);
    let offsetWidth = Math.round(newWidth / 7);
    let graph =  `M${ x + arrowWidth } ${ y } 
                H${ newWidth - offsetWidth }
                C${ (newWidth + offsetWidth) * 0.92 } ${ height / 4 } ${ (newWidth + offsetWidth) * 0.92 } ${ height - (height / 4) } ${ newWidth - offsetWidth } ${ newHeight }
                H${ x + arrowWidth }
                L${ x } ${ height / 2 }
                Z`;
    return (
        <Svg {...props} >
            <path strokeLinecap="round" strokeLinejoin="round" d={graph} />
        </Svg>
    );
}