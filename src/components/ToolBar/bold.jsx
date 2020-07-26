import React, { useState, useEffect } from 'react';
import Button from './button/index';
// 加粗
export default function Bold(props) {
    const [value, setValue] = useState(props.value);
    function onClick() {
        let val = value === 'normal' ? 'bold':'normal';
        setValue(val);
        props.onClick && props.onClick(val);
    }
    useEffect(() => {
        setValue(props.value)
    }, [props.value])
    return (<Button icon="icon-jiacu" active={ value === 'bold' } disabled={props.disabled} onClick={onClick} />)
}