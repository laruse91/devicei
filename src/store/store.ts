import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import homeReducer from './home-reducer'
import thunk from 'redux-thunk'
import shopReducer from './shop-reducer'
import productReducer from './product-reducer'
import appReducer from './app-reducer'
import authReducer from './auth-reducer'
import cartReducer from './cart-reducer'
import contentReducer from './content-reducer'
import newsReducer from './news-reducer'

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    home: homeReducer,
    shop: shopReducer,
    product: productReducer,
    cart: cartReducer,
    content: contentReducer,
    news: newsReducer
})

type TRootReducer = typeof rootReducer // (globalState: GlobalStateType)=> globalState
export type TGlobalState = ReturnType<TRootReducer>

// type for combine ActionCreators into one type
export type TCombineActions<T> = T extends { [key: string]: (...args: Array<any>) => infer U } ? U : never

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
// !! helper to see store in console
// @ts-ignore
window.__store__ = store
export default store
