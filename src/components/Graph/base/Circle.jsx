// 圆
import React, {useEffect, useRef} from 'react';
// 基础配置
// import Svg from '../Svg'
import Canvas from '../Canvas';
import { deepClone } from '@assets/js/utils';
export default function(props) {
    const { width, height } = props;
    const ref = useRef();
    let nextProps = deepClone(props)
    console.log('dd')
    useEffect(() => {
        console.log(props)
        const cvs = ref.current;
        const ctx = cvs.getContext('2d');
        console.log(nextProps.width)
        // nextProps = deepClone(props);
        console.log(props.width);
        // 清空画布
        cvs.width = props.width;
        cvs.height = props.height;
        // 开始设置样式
        ctx.lineWidth = props.strokeWidth;
        ctx.arc(width / 2, height / 2, width / 2 - props.strokeWidth / 2, 0, 2 * Math.PI);
        ctx.stroke();
        console.log(ctx)
    }, [props.width, props.height, props.strokeWidth])
    return (
        <Canvas ref={ref} {...props} />
    );
}