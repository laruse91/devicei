import React from 'react'
import { render } from 'react-dom'
import './index.css'
import App from './App'
import 'antd/dist/antd.css'
import { BrowserRouter } from 'react-router-dom'

render(
    <BrowserRouter basename={process.env.PUBLIC_URL}>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
)
