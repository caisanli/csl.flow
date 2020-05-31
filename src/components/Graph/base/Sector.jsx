// 扇形
import React from 'react';
// 基础配置
import Svg from '../Svg'
export default function(props) {
    return (
        <Svg {...props} >
            <path d="M10 30 C 50 10, 70 10,  110 30" />
            <path d="M30 70 C 50 60, 60 50, 90 70" />
            <polyline points="10,30 30,70 " />
            <polyline points="110,30 90,70 " />
        </Svg>
    );
}