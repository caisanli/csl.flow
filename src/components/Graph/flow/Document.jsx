// 文档
import React from 'react';
// 基础配置
import Svg from '../Svg'
export default function(props) {
    let {width, height, strokeWidth} = props;
    let x = strokeWidth;
    let y = strokeWidth;
        
    let newWidth = width - strokeWidth;
    let newHeight = height - strokeWidth;

    let offsetHeight = Math.round(newHeight / 3);

    let graph = `M${ x } ${ y } H${ newWidth } 
                V${ newHeight - offsetHeight / 2 }
                Q${ newWidth - (newWidth / 4) } ${ newHeight - offsetHeight * 1.5 } ${ newWidth / 2 } ${ newHeight - offsetHeight / 2 } T${ x } ${ newHeight - offsetHeight / 2 }
                Z`;
    return (
        <Svg {...props} >
            <path d={graph} />
        </Svg>
    );
}