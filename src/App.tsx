import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { Shop } from './pages/Shop'
import { Product } from './pages/Product'
import './App.css'
import { Cart } from './pages/Cart'
import { About } from './pages/About'

const App: React.FC = () => {
    let about
    let news
    let error

    return (
        <div className='container'>
            <header className='header'>
                <Header />
            </header>

            <main className='main'>
                <Switch>
                    <Route exact path='/' render={() => <Redirect to={'/home'} />} />
                    <Route path='/home' render={() => <Home />} />
                    <Route path='/shop/:category?' render={() => <Shop />} />
                    <Route path='/product/:id' render={() => <Product />} />
                    <Route path='/cart' render={() => <Cart />} />
                    <Route path='/about' render={() => <About />} />
                    <Route path='/news' render={news} />
                    <Route path='/*' render={error} />
                </Switch>
            </main>

            <footer className='footer'>
                <Footer />
            </footer>
        </div>
    )
}

export default App
