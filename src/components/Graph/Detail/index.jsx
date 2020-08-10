import React from 'react';

// 样式
import style from './index.module.less';
// 获取图形详情top值
function getDetailTop(y) {
    let bh = document.body.offsetHeight;
    let eh = 142;
    let top = y - eh / 2;
    top = top + eh / 2 > bh ? bh - eh : top < 0 ? 0 : top;
    return top;
}

// 图形详情
export default function(props) {
    let { y, visible, graph } = props;
    if(!visible) return null;
    let Comp = graph.comp;
    let title = graph.title;
    let top = getDetailTop(y);
    return (
        <div className={style.graphDetailBox} style={{top: top + 'px'}}>
            <div className={style.graphDetailContent}>
                <div className={style.graphDetailSvg}>
                    <Comp width={120} height={90} strokeWidth={2} stroke={'#244462'}/>
                </div>
                <p className={style.graphDetailTitle}>{title}</p>
            </div>
        </div>
    )
}
