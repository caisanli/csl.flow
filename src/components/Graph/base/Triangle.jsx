// 三角形
import React from 'react';
// 基础配置
import Svg from '../Svg'
export default function(props) {
    return (
        <Svg {...props} >
            <polygon points="60,0 120,120 0,120" />
        </Svg>
    );
}