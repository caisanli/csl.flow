// 上箭头
import React from 'react';
// 基础配置
import Svg from '../Svg'
export default function(props) {
    let {width, height, strokeWidth} = props;
    let x = strokeWidth;
    let y = strokeWidth;
        
    let newWidth = width - strokeWidth;
    let newHeight = height - strokeWidth;

    let WH = Math.round(newWidth / 3);
    let VH = Math.round(newHeight / 2.5);
    let graph = `M${ x } ${ VH }
                L${ width / 2 } ${ y }
                L${ newWidth } ${ VH }
                H${ WH*2 }
                V${ newHeight }
                H${ WH }
                V${ VH }
                Z`
    return (
        <Svg {...props} >
            <path d={ graph } />
        </Svg>
    );
}