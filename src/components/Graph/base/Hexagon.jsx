// 六角形
import React from 'react';
// 基础配置
import Svg from '../Svg'
export default function(props) {
    return (
        <Svg {...props} >
            <polygon points="255,170 765,170 935,510 765,850 255,850 85,510" />
        </Svg>
    );
}