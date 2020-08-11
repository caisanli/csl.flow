// 开始、结束
import React from 'react';
// 基础配置
import Svg from '../Svg'
export default function(props) {
    let {width, height, strokeWidth} = props;
    let x = strokeWidth;
    let y = strokeWidth;
        
    let newWidth = width - strokeWidth;
    let newHeight = height - strokeWidth;

    let offsetWidth = Math.round(newWidth / 8);

    let graph = `M${x + offsetWidth} ${ y } H${ newWidth - offsetWidth }
                C${ (newWidth + offsetWidth) / 1.08 } ${ height / 4 } ${ (newWidth + offsetWidth) / 1.08 } ${ height - (height / 4) } ${ newWidth - offsetWidth } ${ newHeight }
                H${ x + offsetWidth }
                C${ -offsetWidth / 3.49 } ${ height - (height / 4) } ${ -offsetWidth / 3.49 } ${ height / 4 } ${x + offsetWidth} ${ y }`;

    return (
        <Svg {...props} >
            <path d={graph} ></path>
        </Svg>
    );
}