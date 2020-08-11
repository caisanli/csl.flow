// 数据库
import React from 'react';
// 基础配置
import Svg from '../Svg'
export default function(props) {
    let {width, height, strokeWidth} = props;
    let x = strokeWidth;
    let y = strokeWidth;
        
    let newWidth = width - strokeWidth;
    let newHeight = height - strokeWidth;
    let offsetWidth = newWidth / 7;
    // let graph = `M${ x + offsetWidth } ${ y } 
    //             H${ newWidth - offsetWidth } 
    //             C${ (newWidth + offsetWidth) / 1.09  } ${ height / 4 } ${ (newWidth + offsetWidth) / 1.09 } ${ height - height / 4 } ${ newWidth - offsetWidth } ${ newHeight }
    //             H${ x + offsetWidth }
    //             C${ -offsetWidth / 3.5 } ${ height -  height / 4 } ${ -offsetWidth / 3.5 } ${  height / 4 } ${ x + offsetWidth } ${ y }
    //             M${ newWidth - offsetWidth } ${ y }
    //             C${ (newWidth + offsetWidth) / 1.7 } ${ height / 4 } ${ (newWidth + offsetWidth) / 1.7 } ${ height - height / 4 } ${ newWidth - offsetWidth } ${ newHeight }
    //             `;
    let graph = `M${ x + offsetWidth } ${ y } 
                H${ newWidth - offsetWidth } 
                V${ newWidth - offsetWidth } ${ newHeight }
                H${ x + offsetWidth }
                C${ -offsetWidth / 3.5 } ${ height -  height / 4 } ${ -offsetWidth / 3.5 } ${  height / 4 } ${ x + offsetWidth } ${ y }
                `;

    return (
        <Svg {...props} >
            <path stroke-linecap="round" d={graph} ></path>
            <ellipse cx={ newWidth - offsetWidth } cy={ height / 2 } rx={ offsetWidth } ry={ (height - strokeWidth * 2 ) / 2 } ></ellipse>
        </Svg>
    );
}