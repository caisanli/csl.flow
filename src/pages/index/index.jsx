// 库
import React from 'react';
import { Switch, Route } from "react-router-dom";
// 组件
import Nav from "@comp/Nav";
// 页面
import Editor from '@pages/editor';
// 样式
import style from './index.module.less';
export default function Index() {
    return (
        <div className={style.cslContainer}>
            <Nav className={style.cslNav} />
            <section className={style.cslSection}>
              <Switch>
                  <Route path="/" component={ Editor }></Route>
              </Switch>
            </section>
        </div>
    )
}