import React from 'react'
import { render } from 'react-dom'
import './index.css'
import App from './App'
import 'antd/dist/antd.css'
import { BrowserRouter } from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/auth'
import store from './store/store'
import { Provider } from 'react-redux'

const firebaseConfig = {
    apiKey: 'AIzaSyCMEibLtK58R7RcXGjed-kdvXsmuP9rJOU',
    authDomain: 'devicei.firebaseapp.com',
    databaseURL: 'https://devicei-default-rtdb.firebaseio.com',
    projectId: 'devicei',
    storageBucket: 'devicei.appspot.com',
    messagingSenderId: '894419073235',
    appId: '1:894419073235:web:1960efe4c85f9c62a03c26',
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
export const db = firebase.database()
export const fireDB = firebase.firestore()
export const fireAuth = firebase.auth()
export const fireAUTH = firebase.auth.Auth

render(
    <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
)
