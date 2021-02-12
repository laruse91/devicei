import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { Shop } from './pages/Shop'

const App: React.FC = () => {
    let profile
    let about
    let news
    let login
    let error

    return (
        <>
            <Header />

            <main>
                <Switch>
                    <Route exact path='/' render={() => <Redirect to={'/home'} />} />
                    <Route path='/home' render={() => <Home />} />
                    <Route path='/shop/:category?' render={() => <Shop />} />
                    <Route path='/profile/:userId?' render={profile} />
                    <Route path='/about' render={about} />
                    <Route path='/news' render={news} />
                    <Route path='/login' render={login} />
                    <Route path='/*' render={error} />
                </Switch>
            </main>

            <Footer />
        </>
    )
}

export default App
