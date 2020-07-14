import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import style from './index.module.less';

export default function InputNumber(props) {
    const [defaultValue, setDefaultValue] = useState('');
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
        let value  = (defaultValue || 0) + 1;
        setDefaultValue(value)
        props.onChange && props.onChange(value)
    }
    function minute() {
        let value  = (defaultValue || 0) - 1;
        setDefaultValue(value)
        props.onChange && props.onChange(value)
    }
    useEffect(() => {
        setDefaultValue(props.value || '')
    }, [props.value])
    return (
        <div className={style.inputNumber}>
            <div className={style.inputNumberContent}>
                <div className={style.inputNumberInputBox}>
                    <input className={style.inputNumberInput} 
                            type="text" 
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
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    unit: PropTypes.string
}
