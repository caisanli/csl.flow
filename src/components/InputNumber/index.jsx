import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import style from './index.module.less';

export default function InputNumber(props) {
    const [defaultValue, setDefaultValue] = useState(0);
    function onChange(e) {
        let value = e.target.value;
        let numberValue = Number(value);
        if(!numberValue && value !== '')
            setDefaultValue(defaultValue)
        else {
            setDefaultValue(numberValue);
            props.onChange && props.onChange(numberValue)
        }
    }
    function plus() {   
        if(props.disabled)
            return ;
        let value  = (defaultValue || 0) + 1;
        setDefaultValue(value)
        props.onChange && props.onChange(value)
    }
    function minute() {
        if(props.disabled)
            return ;
        let value  = (defaultValue || 0) - 1;
        setDefaultValue(value)
        props.onChange && props.onChange(value)
    }
    useEffect(() => {
        setDefaultValue(props.value || '')
    }, [props.value])
    return (
        <div className={[style.inputNumber, props.disabled ? style.disabled : ''].join(' ')}>
            <div className={style.inputNumberContent}>
                <div className={style.inputNumberInputBox}>
                    <input className={style.inputNumberInput} 
                            type="text" 
                            disabled={props.disabled}
                            value={defaultValue} 
                            placeholder={props.placeholder} 
                            onChange={onChange}/>
                    {props.unit && <span className={style.inputNumberUnit}>{ props.unit }</span>}
                </div>
                <div className={style.inputNumberToolBox}>
                    <div onClick={plus} className={[style.inputNumberTool, style.up].join(' ')}></div>
                    <div onClick={minute} className={[style.inputNumberTool, style.low].join(' ')}></div>
                </div>
            </div>
        </div>
    )
}
InputNumber.propTypes = {
    value: PropTypes.number,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    unit: PropTypes.string
}
