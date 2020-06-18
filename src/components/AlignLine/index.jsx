// 对齐线
import React from 'react';
import styles from './index.module.less';
export default function(props) {
    let {alignType, left, top, height, width, disLeft, disTop} = props;
    let style = {};
    let direct = '';
    switch(alignType) {
        case 'left':
            style.left = left;
            style.height = height;
            style.top = -disTop;
            direct = styles.vertical;
            break;
        case 'top':
            style.top = top;
            style.width = width;
            style.left = -disLeft;
            direct = styles.horizontal;
            break;
    }
    return (
        <div className={[styles.alignLine, direct].join(' ')} style={style}></div>
    )
}