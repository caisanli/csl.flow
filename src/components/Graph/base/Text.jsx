// 文本
import React from 'react';
// 基础配置
import Svg from '../Svg'
export default function(props) {
    return (
        <Svg {...props} >
            <polygon stroke="#000" fill="#000" points="0,20 120,20 120,40 110,35 70,35 70,100 50,100 50,35 10,35 0,40"/>
        </Svg>
    );
}