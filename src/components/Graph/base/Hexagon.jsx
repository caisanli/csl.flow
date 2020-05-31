// 六角形
import React from 'react';
// 基础配置
import Svg from '../Svg'
export default function(props) {
    return (
        <Svg {...props} >
            <polygon points="30,20 90,20 120,60 90,100 30,100 0,60" />
        </Svg>
    );
}