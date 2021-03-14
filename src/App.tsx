import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { Shop } from './pages/Shop'
import { Product } from './pages/Shop/Product'
import './App.css'
import { Cart } from './pages/Cart'
import { About } from './pages/About'
import { News } from './pages/News'
import { FAQ } from './pages/FAQ'
import { Contacts } from './pages/Contacts'
import Error from './pages/Error'

const App: React.FC = () => {

    return (
        <div className='container'>
            <header className='header'>
                <Header />
            </header>

            <main className='main'>
                <Switch>
                    <Route exact path='/' render={() => <Redirect to={'/home'} />} />
                    <Route exact path='/home' render={() => <Home />} />
                    <Route exact path='/shop/:category/:id' render={() => <Product />} />
                    <Route path='/shop/:category?' render={() => <Shop />} />
                    <Route exact path='/cart' render={() => <Cart />} />
                    <Route exact path='/about' render={() => <About />} />
                    <Route exact path='/news/:id?' render={() => <News />} />
                    <Route exact path='/faq' render={() => <FAQ />} />
                    <Route exact path='/contacts' render={() => <Contacts />} />
                    <Route path='/*' render={()=> <Error/>} />
                </Switch>
            </main>

            <footer className='footer'>
                <Footer />
            </footer>
        </div>
    )
}

export default App
