import React from 'react';
// 
import InputNumber from '@/components/InputNumber';
export default function FontSize(props) {
    function onChange(val) {
        props.onClick && props.onClick(val);
    }
    return (
        <InputNumber value={props.value} disabled={props.disabled} onChange={onChange} unit="px"/>
    )
}