// 圆
import React  from 'react';
// 基础配置
import Svg from '../Svg'

export default function(props) {
    let {width, height, strokeWidth} = props;
    let cx = width / 2 ;
    let cy = height / 2;
    width -= strokeWidth ;
    height -= strokeWidth ;
    let rx = width / 2;
    let ry = height / 2;
    let id = Date.now() + Math.random()
    return (
        <Svg {...props}>
            <ellipse id={id} rx={rx} ry={ry} cx={cx} cy={cy}/>
        </Svg>
    );
}