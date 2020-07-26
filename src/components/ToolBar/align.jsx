import React, { useState, useEffect } from 'react';
import Button from './button/index';
import DropDown from '@/components/DropDown';
// 样式
import style from './index.module.less';
// 对齐列表
const aligns1 = [{name: '居左', icon: 'icon-juzuo', value: 'left'}, 
                    {name: '居中', icon: 'icon-juzhong', value: 'center'}, 
                    {name: '居右', icon: 'icon-juzuo', value: 'right'}];
const aligns2 = [{name: '居上', icon: 'icon-jushang', value: 'top'}, 
                    {name: '居中', icon: 'icon-juzhong1', value: 'middle'}, 
                    {name: '居下', icon: 'icon-juxia', value: 'bottom'}];
// 对齐方式
export default function Align(props) {
    let aligns = props.value.split('-');
    let dropdown = null;
    const [align1, setAlign1] = useState(aligns[0]);
    const [align2, setAlign2] = useState(aligns[1]);
    
    function onClickItem1({value}) {
        dropdown.close();
        setAlign1(value);
        props.onClick && props.onClick(`${value}-${align2}`);
    }
    function onClickItem2({value}) {
        dropdown.close();
        setAlign2(value);
        props.onClick && props.onClick(`${align1}-${value}`);
    }
    function onRef(instance) {
        dropdown = instance;
    }
    useEffect(() => {
        let aligns = props.value.split('-');
        setAlign1(aligns[0]);
        setAlign2(aligns[1]);
    }, [props.value])
    return <DropDown onRef={onRef}
                    disabled={props.disabled}
                    icon="icon-zu" 
                    text={<Button disabled={props.disabled} icon="icon-juzuo"></Button>}
                    content={
                        <>
                            <div>
                                { 
                                    aligns1.map(
                                        (f, i) =>   
                                            <div className={[style.dropdownButtonItem, f.value === align1 ? style.active : ''].join(' ')} 
                                                onClick={() => onClickItem1(f)} key={i}>
                                                <span className={['iconfont', style.iconfont, f.icon].join(' ')}></span>
                                                {f.name}
                                            </div>
                                    )
                                }
                            </div>
                            <div>
                                <div className={style.divide}></div>
                                { 
                                    aligns2.map(
                                        (f, i) =>   
                                            <div className={[style.dropdownButtonItem, f.value === align2 ? style.active : ''].join(' ')} 
                                                onClick={() => onClickItem2(f)} key={i}>
                                                <span className={['iconfont', style.iconfont, f.icon].join(' ')}></span>
                                                {f.name}
                                            </div>
                                    )
                                }
                            </div>
                        </>
                    }/>
}
