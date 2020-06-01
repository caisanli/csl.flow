// 扇形
import React from 'react';
// 基础配置
import Svg from '../Svg'
export default function(props) {
    return (
        <Svg {...props} >
            <path d="M10 30 C 50 10, 70 10, 110 30, L100 60 C 60 40, 50 50, 25 60 L10 30" />
        </Svg>
    );
}