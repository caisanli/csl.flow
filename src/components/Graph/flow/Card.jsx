// 卡片
import React from 'react';
// 基础配置
import Svg from '../Svg'
export default function(props) {
    let {width, height, strokeWidth} = props;
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
    return (
        <Svg {...props} >
            <path d={graph} />
        </Svg>
    );
}