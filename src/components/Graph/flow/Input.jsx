// 人工输入
import React from 'react';
// 基础配置
import Svg from '../Svg'
export default function(props) {
    let {width, height, strokeWidth} = props;
    let x = strokeWidth;
    let y = strokeWidth;
        
    let newWidth = width - strokeWidth;
    let newHeight = height - strokeWidth;
    let offsetHeight = height / 6;
    let graph = `M${ x } ${ offsetHeight }
                V${ newHeight }
                H${ newWidth }
                V${ y }
                Z`;
    return (
        <Svg {...props} >
            <path d={graph} />
        </Svg>
    );
}