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
                <Comp width={120} height={90} strokeWidth={15} stroke={'#244462'}/>
            </div>
        </div>
    )
})
