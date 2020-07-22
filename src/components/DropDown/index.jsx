import React, {useEffect, useState, useRef} from 'react';
import PropTypes from 'prop-types';
import style from './index.module.less';
import { getParent } from "@assets/js/utils";
export default function DropDown(props) {
    const [visible, setVisible] = useState(false);
    const [top, setTop] = useState(0);
    const boxRef = useRef(null);
    function onClick() {
        if(props.disabled)
            return ;
        setVisible(!visible)
    }
    function close() {
        setVisible(false)
    }
    function clickBody(e) {
        let className = e.target.className;
        if((className || '').includes(style.dropdownWarp) || getParent(e.target, `.${style.dropdownWarp}`))
            return ;
        setVisible(false);
    }
    useEffect(() => {
        let top = boxRef.current.offsetHeight + 3;
        setTop(top);
        props.onRef && props.onRef({close});
        document.body.addEventListener('click', clickBody);
        return function () {
            document.body.removeEventListener('click', clickBody);
        }
    })
    return (
        <div className={style.dropdown} ref={boxRef}>
            <div className={[style.dropdownLabel, visible ? style.hover : '', props.disabled ? style.disabled : ''].join(' ')} onClick={onClick}>
                <div className={style.dropdownLabelText}>
                    { props.text }
                </div>
                <div className={style.dropdownLabelIcon}></div>
            </div>
            {
                visible && <div className={style.dropdownContent} style={{top: top + 'px'}}>
                                <div className={style.dropdownWarp}>
                                    { props.content }
                                </div>
                            </div>
            }
        </div>
    )
}