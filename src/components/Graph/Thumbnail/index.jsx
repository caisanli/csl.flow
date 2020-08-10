import React from 'react';
// 样式
import style from './index.module.less';

export default function(props) {
    let {enter, leave, mouseDown} = props;
    return (
        <div >
            {
                props.graphs.map((g,i) => {
                    let Comp = g.comp;
                    return (
                    <div key={i}
                        className={style.graph} 
                        onMouseDown={e => mouseDown && mouseDown(g, e)}
                        onMouseEnter={e => enter && enter(g, e)} 
                        onMouseLeave={e => leave && leave(g, e)} >
                        <Comp width={40} height={40} strokeWidth={2} fill="#fff" />
                    </div>
                    )
                })
            }
        </div>
    );
}