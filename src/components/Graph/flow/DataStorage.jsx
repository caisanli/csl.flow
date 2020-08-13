// 队列数据
import React from 'react';
// 基础配置
import Svg from '../Svg'
import defaultDot from '@assets/js/dots';

export default function(props) {
    let {width, height, strokeWidth, showDot} = props;
    let cx = width / 2 ;
    let cy = height / 2;
    width -= strokeWidth ;
    height -= strokeWidth ;
    let rx = width / 2;
    let ry = height / 2;
    let id = Date.now() + Math.random()
    let dots = showDot ? [defaultDot.tc, defaultDot.mr, defaultDot.ml, defaultDot.bc] : [];   

    return (
        <Svg {...props} dots={dots}>
            <ellipse id={id} rx={rx} ry={ry} cx={cx} cy={cy}/>
            <line x1={ rx } y1={ height + strokeWidth } x2={ width } y2={ height } />
        </Svg>
    );
}