import 'core-js/stable';
import 'regenerator-runtime/runtime'
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
// 通用样式
import '@/assets/css/theme.less';
import '@/assets/css/reset.less';
import '@/assets/css/base.less';
// 组件
import Index from './pages/index';

ReactDom.render(
    <Router>
        <Index />
    </Router>, 
    document.getElementById("root")
);
if (module.hot) {  
    module.hot.accept();
}