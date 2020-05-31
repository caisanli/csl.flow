import React, { useState } from 'react';
import PropsType from 'prop-types';

function Collapse(props) {
    let [activeKey, setActiveKey] = useState(props.defaultActiveKeys);
    let onItemClick = (key) => {
        let index = activeKey.indexOf(key)
        if(index > -1) {
            activeKey.splice(index, 1);
            setActiveKey([...activeKey]);
        } else {
            setActiveKey([...activeKey, key]);
        }
    }
    return (
        <div>
            { 
                props.children.map((child) => {
                    let key = child.key;
                    let props = {
                        onItemClick: () => onItemClick(key),
                        isActive: activeKey.includes(key)
                    }
                    return React.cloneElement(child, props);
                })
            }
        </div>
    )
}

Collapse.propTypes = {
    accordion: PropsType.bool, // 是否开启手风琴
    defaultActiveKeys: PropsType.array, // 默认展开
}
Collapse.defaultProps = {
    defaultActiveKeys: []
}
export default Collapse;