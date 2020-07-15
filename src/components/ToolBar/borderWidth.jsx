import React from 'react'
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
export default function BorderWidth (props) {
    let dropdown = null
    function onClickItem (f) {
        dropdown.close()
        props.onClick && props.onClick(f)
    }
    function onRef (instance) {
        dropdown = instance
    }
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
                            className={style.dropdownButtonItem}
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
