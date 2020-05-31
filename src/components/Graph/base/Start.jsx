// 文本
import React from 'react';
// 基础配置
import Svg from '../Svg'
export default function(props) {
    return (
        <Svg {...props} >
            <polygon points="60,0 80,40 120,40 90,70 105,120 60,85 15,120 30,70 0,40 40,40" />
        </Svg>
    );
}