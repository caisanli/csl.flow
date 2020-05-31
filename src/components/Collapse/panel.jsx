import React from 'react';
import PropTypes from "prop-types";
// 样式
import style from './panel.module.less'
function Panel(props) {
    console.log(this)
    let {header, children, onItemClick, isActive} = props;
    return (
        <div className={[style.item, isActive ? style.active : ''].join(' ')}>
            <div className={style.header} onClick={ onItemClick }>
                {header}
            </div>
            <div className={style.content} >
                {children}
            </div>
        </div>
    )
}

Panel.propTypes = {
    header: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.elementType
    ])
}

export default Panel;