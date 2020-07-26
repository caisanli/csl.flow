import React, { useState, useEffect } from 'react';
import Button from './button/index';
// 斜体
export default function Italics(props) {
    const [value, setValue] = useState(props.value);
    function onClick() {
        let val = value === 'normal' ? 'italic':'normal';
        setValue(val);
        props.onClick && props.onClick(val);
    }
    useEffect(() => {
        setValue(props.value)
    }, [props.value])
    return (<Button icon="icon-xieti" active={ value === 'italic' } disabled={props.disabled} onClick={onClick} />)
}