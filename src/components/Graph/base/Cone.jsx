// 锥形
import React from 'react';
// 基础配置
import Svg from '../Svg'
export default function(props) {
    return (
        <Svg {...props} >
            <path d="M170 255 C 425 85, 595 85, 850 255 L510 850 L170 255"/>
        </Svg>
    );
}