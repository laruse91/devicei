import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import homeReducer from './home-reducer'
import thunk from 'redux-thunk'
import shopReducer from './shop-reducer'
import productReducer from './product-reducer'

const rootReducer = combineReducers({
    home: homeReducer,
    shop: shopReducer,
    product: productReducer,
})

type TRootReducer = typeof rootReducer // (globalState: GlobalStateType)=> globalState
export type TGlobalState = ReturnType<TRootReducer>

// type for combine ActionCreators into one type
export type TCombineActions<T> = T extends { [key: string]: (...args: Array<any>) => infer U } ? U : never

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        // @ts-ignore
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

// !! helper to see store in console
// @ts-ignore
window.__store__ = store
export default store
