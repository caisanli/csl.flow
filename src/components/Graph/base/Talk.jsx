// 对话
import React from 'react';
// 基础配置
import Svg from '../Svg'
export default function(props) {
    let {width, height, strokeWidth} = props;
    let x = strokeWidth;
    let y = strokeWidth;
        
    let newWidth = width - strokeWidth;
    let newHeight = height - strokeWidth;
    let offsetWidth = Math.round(newWidth / 7)
    let offsetHeight =  Math.round(newHeight / 7)
    const W = newWidth / 10;
    const H = 10;

    let graph = `M${ offsetWidth } ${ newHeight - offsetHeight }
                A${ newWidth / 2 } ${ newHeight / 2 } 0 1 1 ${ offsetWidth + W } ${ newHeight - offsetHeight + H }
                L${ x } ${ newHeight }
                Z`;
    return (
        <Svg {...props} >
            <path d={graph} />
            {/* <path xmlns="http://www.w3.org/2000/svg" d="M512 64C264.576 64 64 250.624 64 480.768c0 116.736 57.152 238.784 199.744 310.848 0 48.128-45.632 120.32-91.392 168.384 136.896-12.032 196.864-46.976 245.504-71.808C448.32 894.144 479.616 897.6 512 897.6c247.36 0 448-186.56 448-416.896C960 250.624 759.36 64 512 64z" p-id="5440"/> */}
        </Svg>
    );
}