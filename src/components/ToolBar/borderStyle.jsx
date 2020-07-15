import React from 'react'
import Button from './button/index'
import DropDown from '@/components/DropDown'
// 样式
import style from './index.module.less'
// 宽度列表
const borderStyles = [{value: 'solid'}, {value: 'dashed'}, {value: 'dotted'}]

// 线样式
export default function BorderStyle (props) {
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
            text={<Button disabled={props.disabled} icon="icon-xuxian"></Button>}
            content={
                <>
                    {borderStyles.map((f, i) => (
                        <div
                            className={style.dropdownButtonItem}
                            onClick={() => onClickItem(f)}
                            key={i}
                        >
                            <div style={{'borderStyle': f.value}} className={style.borderStyle}></div>
                        </div>
                    ))}
                </>
            }
        />
    )
}
