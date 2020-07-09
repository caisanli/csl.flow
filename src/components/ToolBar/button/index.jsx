import React from 'react';
import PropTypes from 'prop-types';
import style from './index.module.less';
export default function Button(props) {
    return (
        <div className={[style.button, props.disabled ? 'disable' : ''].join(' ')}>
            { props.icon && <span className={['iconfont', props.icon].join(' ')}></span> }
            { props.children }
        </div>
    )
}
Button.propTypes = {
    disabled: PropTypes.bool,
    icon: PropTypes.string
}