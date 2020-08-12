// 跨页引用
import React from 'react';
// 基础配置
import Svg from '../Svg'
export default function(props) {
    let {width, height, strokeWidth} = props;
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
    return (
        <Svg {...props} >
            <path d={graph} strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
    );
}