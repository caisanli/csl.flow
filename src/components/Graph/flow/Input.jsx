// 人工输入
import React from 'react';
// 基础配置
import Svg from '../Svg'
import defaultDot, { dotHeight } from '@assets/js/dots';
import {deepClone} from '@assets/js/utils';
let newDefaultDot = deepClone(defaultDot)

export default function(props) {
    let {width, height, strokeWidth, showDot} = props;
    let x = strokeWidth;
    let y = strokeWidth;
        
    let newWidth = width - strokeWidth;
    let newHeight = height - strokeWidth;
    let offsetHeight = height / 6;
    let graph = `M${ x } ${ offsetHeight }
                V${ newHeight }
                H${ newWidth }
                V${ y }
                Z`;
    let dots = showDot ? [Object.assign(newDefaultDot.tc, {
        top: offsetHeight / 2 - dotHeight / 2
    }), newDefaultDot.mr, newDefaultDot.ml, newDefaultDot.bc] : [];   

    return (
        <Svg {...props} dots={dots} >
            <path d={graph} />
        </Svg>
    );
}