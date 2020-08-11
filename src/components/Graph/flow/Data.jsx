// 数据
import React from 'react';
// 基础配置
import Svg from '../Svg'
export default function(props) {
    let {width, height, strokeWidth} = props;
    let x = strokeWidth;
    let y = strokeWidth;
        
    let newWidth = width - strokeWidth;
    let newHeight = height - strokeWidth;

    let offsetWidth = Math.round(newWidth / 6);
    let graph = `M${ x + offsetWidth } ${ y }
                H${ newWidth }
                L${ newWidth - offsetWidth } ${ newHeight }
                H${ x }
                Z`;
    return (
        <Svg {...props} >
            <path d={graph} />
        </Svg>
    );
}