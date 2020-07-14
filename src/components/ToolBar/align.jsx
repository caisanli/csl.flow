import React from 'react';
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
    let dropdown = null;
    function onClickItem(f) {
        dropdown.close();
        props.onClick && props.onClick(f);
    }
    function onRef(instance) {
        dropdown = instance;
    }
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
                                            <div className={style.dropdownButtonItem} onClick={() => onClickItem(f)} key={i}>
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
                                            <div className={style.dropdownButtonItem} onClick={() => onClickItem(f)} key={i}>
                                                <span className={['iconfont', style.iconfont, f.icon].join(' ')}></span>
                                                {f.name}
                                            </div>
                                    )
                                }
                            </div>
                        </>
                    }/>
}
