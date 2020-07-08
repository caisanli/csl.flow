import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import style from './index.module.less';
export default function DropDown(props) {

    return (
        <div className={style.dropdown}>
            <div className={style.dropdownLabel}>
                <div className={style.dropdownLabelText}>
                    { props.text }
                </div>
                <div className={style.dropdownLabelIcon}></div>
            </div>
            {
                props.visible && <div className={style.dropdownContent}>
                                    <div className={style.dropdownWarp}>
                                        { props.content }
                                    </div>
                                </div>
            }
        </div>
    )
}
DropDown.propTypes = {
    visible: PropTypes.bool.isRequired
}