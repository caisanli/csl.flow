// 锥形
import React from 'react';
// 基础配置
import Svg from '../Svg'
export default function(props) {
    return (
        <Svg {...props} >
            <path d="M20 30 C 50 10, 70 10,  100 30" stroke="black" fill="transparent"/>
            <polyline points="20,30 60,110 100,30" />
        </Svg>
    );
}