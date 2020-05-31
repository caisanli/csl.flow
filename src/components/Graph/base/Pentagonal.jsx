// 五角形
import React from 'react';
// 基础配置
import Svg from '../Svg'
export default function(props) {
    return (
        <Svg {...props} >
            <polygon points="60,0 120,45 100,120 20,120 0,45" />
        </Svg>
    );
}