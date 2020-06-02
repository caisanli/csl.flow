// 菱形
import React from 'react';
// 基础配置
import Svg from '../Svg'
export default function(props) {
    return (
        <Svg {...props} >
            <polygon points="510,170 935,510 510,850 85,510" />
        </Svg>
    );
}