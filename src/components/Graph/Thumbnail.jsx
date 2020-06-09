import React from 'react';
// 样式
import style from './Thumbnail.module.less';

export default function(props) {
    let {enter, leave, dragStart, drag, dragEnd} = props;
    return (
        <div >
            {
                props.graphs.map((g,i) => {
                    let Comp = g.comp;
                    return (
                    <div key={i}
                        className={style.graph} 
                        draggable={true}
                        onDrag={e => drag && drag(g, e)}
                        onDragStart={e => dragStart && dragStart(g, e)}
                        onDragEnd={dragEnd}
                        onMouseEnter={e => enter && enter(g, e)} 
                        onMouseLeave={e => leave && leave(g, e)} >
                        <Comp width={40} height={40} strokeWidth={30} />
                    </div>
                    )
                })
            }
        </div>
    );
}