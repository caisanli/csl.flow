// 十字
import React from 'react';
// 基础配置
import Svg from '../Svg'
export default function(props) {
    return (
        <Svg {...props} >
            <polygon points="50,0 70,0 70,50 120,50 120,70 70,70 70,120 50,120 50,70 0,70 0,50 50,50" />
        </Svg>
    );
}