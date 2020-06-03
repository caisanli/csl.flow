// 备注
import React from 'react';
// 基础配置
import Svg from '../Svg'
export default function(props) {
    return (
        <Svg {...props} >
            <polygon strokeWidth="1" points="170,85 640,85 850,170 850,935 170,935" fill="#ffffaa" stroke="#ffffaa"/>
            <polygon strokeWidth="1" points="640,85 680,240 850,170" fill="#cdcd78" stroke="#cdcd78"/>
        </Svg>
    );
}