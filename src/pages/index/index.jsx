// 库
import React from 'react';
import { Switch, Route } from "react-router-dom";
// 组件
import Nav from "@comp/Nav";
// 页面
import Editor from '@pages/editor';
export default function Index() {
    return (
        <div className={'csl-container'}>
            <Nav />
            <Switch>
                <Route path="/" component={ Editor }></Route>
            </Switch>
        </div>
    )
}