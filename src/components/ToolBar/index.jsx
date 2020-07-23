// 工具栏
import React from 'react'
import PropTypes from 'prop-types';
import ToolTip from 'rc-tooltip';
// 样式
import '@assets/css/rc-tooltip.css';
import style from './index.module.less';
// 导入功能按钮
import tools from './tools';

let newTools = tools.slice(0);
export default function ToolBar (props) {
    newTools = newTools.map(t => {
        t.disabled = props.disabled.includes(t.value);
        return t;
    })
    function onClick(...arg) {
        props.onClick && props.onClick(...arg);
    }
    return (
        <div className={style.toolBarBox}>
            {/* 常用功能 */}
            <div className={style.tools}>
                {newTools.map((t, i) => {
                    const Comp = t.comp;
                    if(!Comp) return null;
                    return (<div key={i} 
                                className={[style.tool, t.interval ? style.interval:''].join(' ')}>
                                <ToolTip id={t.value} placement="top" trigger={['hover']} overlay={<span>{t.name}</span>}>
                                    <Comp value={props.styleObj[t.value]} disabled={t.disabled} onClick={data => onClick(t.value, data)} />
                                </ToolTip>
                            </div>)
                })}
            </div>
            {/* 辅助功能 */}
            <div></div>
        </div>
    );
}
ToolBar.propTypes = {
    disabled: PropTypes.arrayOf(PropTypes.string).isRequired,
    styleObj: PropTypes.object.isRequired
}