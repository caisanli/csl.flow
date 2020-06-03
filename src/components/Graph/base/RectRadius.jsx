// 圆角矩形
import React from 'react';
// 基础配置
import Svg from '../Svg'
export default function(props) {
    return (
        <Svg {...props} >
            <rect x="85" y="170" width="835" height="680" rx="85" ry="85" />
        </Svg>
    );
}