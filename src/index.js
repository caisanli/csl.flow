import React from 'react';
import ReactDom from 'react-dom';
import styels from '@ast/css/test.css';
import img from '@ast/image/01.jpeg';
console.log(img)
function Test() {
  return <h1 className={styels.h1}>测试01</h1>;
}

ReactDom.render(<Test />, document.getElementById("root"));
