import 'core-js/stable';
import 'regenerator-runtime/runtime'
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router } from "react-router-dom";
// reducers
import reducers from './reducers'
// 通用样式
import '@/assets/fonts/iconfont.css';
import '@/assets/css/theme.less';
import '@/assets/css/reset.less';
import '@/assets/css/base.less';
// 组件
import Index from './pages/index';
let store = createStore(reducers)
ReactDom.render(
    <Provider store={store}>
        <Router>
            <Index />
        </Router>
    </Provider>
    ,
    document.getElementById("root")
);
if (module.hot) {  
    module.hot.accept();
}