import React, { useState, useEffect } from 'react'
import Button from './button/index'
import DropDown from '@/components/DropDown'
// 样式
import style from './index.module.less'
// 宽度列表
let widths = [], len = 10;
for (let index = 0; index < len; index++) {
    let value = index + 1;
    widths.push({
        name: value + 'px',
        value
    })
    
}

// 线宽
export default function BorderSize(props) {
    const [size, setSize] = useState(props.value);
    let dropdown = null
    function onClickItem({value}) {
        dropdown.close();
        setSize(value)
        props.onClick && props.onClick(value);
    }
    function onRef (instance) {
        dropdown = instance
    }
    useEffect(() => {
        setSize(props.value)
    }, [props.value])
    return (
        <DropDown
            onRef={onRef}
            disabled={props.disabled}
            icon="icon-zu"
            text={<Button disabled={props.disabled} icon="icon-juzuo"></Button>}
            content={
                <>
                    {widths.map((f, i) => (
                        <div
                            className={[style.dropdownButtonItem, f.value === size ? style.active : ''].join(' ')}
                            onClick={() => onClickItem(f)}
                            key={i}
                        >
                            {f.name}
                        </div>
                    ))}
                </>
            }
        />
    )
}
