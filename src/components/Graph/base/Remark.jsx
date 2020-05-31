// 备注
import React from 'react';
// 基础配置
import Svg from '../Svg'
export default function(props) {
    return (
        <Svg {...props} >
            <polygon points="20,0 80,0 100,20 100,120 20,120" fill="#ffffaa" stroke="#ffffaa"/>
            <polygon points="80,0 100,20 80,20" fill="#cdcd78" stroke="#cdcd78"/>
        </Svg>
    );
}