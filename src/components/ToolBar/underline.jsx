import React, { useState, useEffect } from 'react';
import Button from './button/index';
// 下划线
export default function Underline(props) {
    const [value, setValue] = useState(props.value);
    function onClick() {
        let val = value === 'none' ? 'underline' : 'none';
        setValue(val);
        props.onClick && props.onClick(val);
    }
    useEffect(() => {
        setValue(props.value)
    }, [props.value])
    return (<Button icon="icon-xiahuaxian" active={ value === 'underline' } disabled={props.disabled} onClick={onClick} />)
}