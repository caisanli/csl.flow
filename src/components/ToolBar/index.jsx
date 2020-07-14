// 工具栏
import React from 'react'
// 样式
import style from './index.module.less';
// 导入功能按钮
import tools from './tools';
export default function (props) {
    function onClick(...arg) {
        console.log('click...')
        props.onClick && props.onClick(...arg);
    }
    return (
        <div className={style.toolBarBox}>
            {/* 常用功能 */}
            <div className={style.tools}>
                {tools.map((t, i) => {
                    const Comp = t.comp;
                    if(!Comp) return null;
                    return (<div key={i} 
                                className={[style.tool, t.interval ? style.interval:''].join(' ')}>
                                <Comp onClick={data => onClick(t.value, data)} />
                            </div>)
                })}
            </div>
            {/* 辅助功能 */}
            <div></div>
        </div>
    );
}
