// 扇形
import React from 'react';
// 基础配置
import Svg from '../Svg'
export default function(props) {
    let {width, height, strokeWidth} = props;
    let x = strokeWidth;
    let y = strokeWidth;

    let newWidth = width - strokeWidth;
    let newHeight = height - strokeWidth;
    let offsetHeight = Math.round(newHeight / 5);
    let offsetWidth = Math.round(newWidth / 4);
    let graph = `M${ x } ${ offsetHeight }
                C${ newWidth / 4 } ${ -offsetHeight / 3.49 } ${ newWidth - newWidth / 4 } ${ -offsetHeight / 3.49 } ${ newWidth } ${ offsetHeight }
                L${ newWidth - offsetWidth } ${ newHeight }
                C${ newWidth - newWidth / 2.5 } ${ newHeight - offsetHeight / 3 } ${ newWidth / 2.5 } ${ newHeight - offsetHeight / 3 } ${ offsetWidth } ${ newHeight }
                L${ x } ${ offsetHeight }`;

    return (
        <Svg {...props} >
            <path d={ graph } />
        </Svg>
    );
}