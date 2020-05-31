// 圆形
import React from 'react';
// 基础配置
import Svg from '../Svg'
export default function(props) {
    return (
        <Svg {...props} >
            <rect x="0" y="20" width="120" height="80" />
        </Svg>
    );
}