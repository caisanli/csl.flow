import React from 'react';
// 
import InputNumber from '@/components/InputNumber';
export default function FontSize(props) {
    function onChange(val) {
        props.onClick && props.onClick({value: val});
    }
    return (
        <InputNumber disabled={props.disabled} onChange={onChange} unit="px"/>
    )
}