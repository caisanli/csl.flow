// 五角形
import React from 'react';
// 基础配置
import Svg from '../Svg'
export default function(props) {
    return (
        <Svg {...props} >
            <polygon points="510,85 935,382.5 850,935 170,935 85,382.5" />
        </Svg>
    );
}