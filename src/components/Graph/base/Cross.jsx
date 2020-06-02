// 十字
import React from 'react';
// 基础配置
import Svg from '../Svg'
export default function(props) {
    return (
        <Svg {...props} >
            <polygon points="425,85 595,85 595,425 935,425 935,595 595,595 595,935 425,935 425,595 85,595 85,425 425,425" />
        </Svg>
    );
}