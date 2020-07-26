import React from 'react';
import Button from './button/index';
// 置顶
export default function Top(props) {
    function onClick() {
        props.onClick && props.onClick();
    }
    return <Button disabled={props.disabled} onClick={onClick} icon="icon-zhiding" />
}