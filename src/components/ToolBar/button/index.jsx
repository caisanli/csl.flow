import React from 'react';
import PropTypes from 'prop-types';
import style from './index.module.less';
export default function Button(props) {
    function onClick(e) {
        if(!props.disabled)
            props.onClick && props.onClick(e)
    }
    return (
        <div className={[style.button, props.disabled ? style.disabled : '', props.active ? style.active : ''].join(' ')} onClick={onClick}>
            <div className={style.buttonWarp}>
                { props.icon && <span className={['iconfont', props.icon].join(' ')}></span> }
                { props.children }
            </div>
        </div>
    )
}
Button.propTypes = {
    disabled: PropTypes.bool,
    icon: PropTypes.string
}