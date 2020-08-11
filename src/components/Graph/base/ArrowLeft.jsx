// 左箭头
import React from 'react';
// 基础配置
import Svg from '../Svg'
export default function(props) {
    let {width, height, strokeWidth} = props;
    let x = strokeWidth;
    let y = strokeWidth;
        
    let newWidth = width - strokeWidth;
    let newHeight = height - strokeWidth;

    let WH = Math.round(newWidth / 2.5);
    let VH = Math.round(newHeight / 3);
    let graph = `M${ x } ${ height / 2 } 
                L${ WH } ${ y }
                V${ VH }
                H${ newWidth }
                V${ VH * 2 }
                H${ WH }
                V${ newHeight }
                Z`
    return (
        <Svg {...props} >
            <path d={ graph } />
        </Svg>
    );
}