import React, { useState, useEffect } from 'react';
import Button from './button/index';
// 锁定
export default function Lock(props) {
    const [lock, setLock] = useState(props.value);
    function onClick() {
        let value = !lock;
        setLock(value);
        props.onClick && props.onClick(value);
    }
    useEffect(() => {
        setLock(props.value)
    }, [props.value])
    return <Button disabled={props.disabled} onClick={onClick} icon={lock ? 'icon-jiesuounlocked24' : 'icon-suoding'} />
}