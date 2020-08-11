import React from 'react';
import style from './index.module.less';

// 移动图形
export default React.forwardRef((props, ref) => {
    let { x, y, visible, graph } = props;
    if(!visible) return null;
    let Comp = graph.comp;
    let top = y;
    let left = x;
    return (
        <div ref={ref} className={style.graphMoveBox} style={{top: top + 'px', left: left + 'px'}}>
            <div className={style.graphMoveContent}>
                <Comp width={100} height={100} strokeWidth={2} stroke={'#244462'} fill="#ffffff"/>
            </div>
        </div>
    )
})
