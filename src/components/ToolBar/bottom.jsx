import React from 'react';
import Button from './button/index';
// 置底
export default function Bottom(props) {
    function onClick() {
        props.onClick && props.onClick();
    }
    return <Button disabled={props.disabled} onClick={onClick} icon="icon-zhidi" />
}