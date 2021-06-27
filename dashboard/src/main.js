import React from "react";
import ReactDOM from "react-dom";
import './css/main.css'
import App from './App'
import demoStore from './store/DemoStore'
import {Provider} from 'mobx-react'

ReactDOM.render(
    <Provider demoStore={demoStore}>
        <App />
    </Provider>
    , document.getElementById('app'));

if (module.hot) {
    // enables hot module replacement if plugin is installed
    module.hot.accept();
}