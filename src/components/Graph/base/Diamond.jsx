// 菱形
import React from 'react';
// 基础配置
import Svg from '../Svg'
export default function(props) {
    return (
        <Svg {...props} >
             <polygon points="60,20 120,60 60,100 0,60" />
        </Svg>
    );
}