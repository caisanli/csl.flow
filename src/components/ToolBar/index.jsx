// 工具栏
import React from 'react'
// 样式
import style from './index.module.less';
// 导入功能按钮
import tools from '@/assets/json/tools.json';
console.log(tools)
export default function ({ click }) {
    return (
        <div className={style.toolBarBox}>
            {/* 常用功能 */}
            <div className={style.tools}>
                {tools.map((t, i) => {
                    return (
                        <div key={i} onClick={() => click(t)} className={[style.tool, t.interval ? style.interval : ''].join(' ')}>
                            {t.name}
                        </div>
                    )
                })}
            </div>
            {/* 辅助功能 */}
            <div></div>
        </div>
    );
}
