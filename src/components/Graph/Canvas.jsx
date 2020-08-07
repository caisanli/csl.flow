import React from 'react';

export default React.forwardRef((props, ref) => {
    return (
        <canvas ref={ref} width={props.width} height={props.height} />
    )
});