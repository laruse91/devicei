import { TCombineActions, TGlobalState } from './store'
import { ThunkAction } from 'redux-thunk'
import { goodsAPI } from '../api/goods-api'
import { TCart } from '../types/types'
import { Dispatch } from 'redux'
import { authAPI } from '../api/auth-api'

const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'
const CLEAR_CART = 'CLEAR_CART'

export const initialState = {
    cart: [] as TCart[],
}

export type TInitialState = typeof initialState

const cartReducer = (state = initialState, action: TActions): TInitialState => {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state,
                cart: [...state.cart.filter((product) => product.id !== action.product.id), action.product],
            }
        case REMOVE_PRODUCT:
            return {
                ...state,
                cart: state.cart.filter((product) => product.id !== action.productId),
            }
        case CLEAR_CART:
            return {
                ...state,
                cart: action.payload,
            }
        case UPDATE_QUANTITY:
            return {
                ...state,
                cart: state.cart.map((o) => {
                    if (o.id === action.productId) {
                        o.quantity = action.value
                        return o
                    }
                    return o
                }),
            }
        default:
            return state
    }
}

// ActionCreators
type TActions = TCombineActions<typeof actions>

export const actions = {
    addToCart: (product: TCart) => ({ type: ADD_TO_CART, product } as const),
    removeProduct: (productId: string) => ({ type: REMOVE_PRODUCT, productId } as const),
    updateQuantity: (productId: string, value: number) => ({ type: UPDATE_QUANTITY, productId, value } as const),
    clearCart: () => ({ type: CLEAR_CART, payload: [] as TCart[] } as const),
}

// Thunks
type TThunk = ThunkAction<Promise<void>, () => TGlobalState, unknown, TActions>

export const addProductToCart = (userId: string | undefined, product: TCart): TThunk => async (dispatch) => {
    if (userId) {
        const resp = await authAPI.addCartProduct(userId, product.id, product.quantity).catch((err) => console.log(err))
        if (resp) dispatch(actions.addToCart(product))
    } else {
        let cart: { [id: string]: number } = {}
        const prev = localStorage.getItem('cart')
        if (prev) {
            cart = prev && JSON.parse(prev)
        }
        cart[product.id] = product.quantity
        localStorage.setItem('cart', JSON.stringify(cart))
        dispatch(actions.addToCart(product))
    }
}
export const removeProduct = (userId: string | undefined, productId: string): TThunk => async (dispatch) => {
    if (userId) {
        const resp = await authAPI.removeCartProduct(userId, productId).catch((err) => console.log(err))
        if (resp) dispatch(actions.removeProduct(productId))
    } else {
        let cart: { [id: string]: number } = {}
        const prev = localStorage.getItem('cart')
        if (prev) {
            cart = prev && JSON.parse(prev)
        }
        delete cart[productId]
        localStorage.setItem('cart', JSON.stringify(cart))
        dispatch(actions.removeProduct(productId))
    }
}
export const updateQuantity = (userId: string | undefined, productId: string, value: number): TThunk => async (
    dispatch,
) => {
    if (userId) {
        const response = await authAPI.addCartProduct(userId, productId, value).catch((err) => console.log(err))
        if (response) dispatch(actions.updateQuantity(productId, value))
    } else {
        let cart: { [id: string]: number } = {}
        const prev = localStorage.getItem('cart')
        if (prev) {
            cart = prev && JSON.parse(prev)
        }
        cart[productId] = value
        localStorage.setItem('cart', JSON.stringify(cart))
        dispatch(actions.updateQuantity(productId, value))
    }
}

export const getCartProduct = (id: string, quantity: number): TThunk => async (dispatch) => {
    const product = await goodsAPI.requestProduct(id).catch(err => console.log(err))
    if (product) {
        const cartProduct: TCart = {
            id: product.id,
            quantity: quantity,
            image: product.image,
            name: product.name,
            price: product.price,
            category: product.category,
        }
        dispatch(actions.addToCart(cartProduct))
    }
}

export const getUserCart = (userId?: string | null): TThunk => async (dispatch) => {
    if (userId) {
        const user = await authAPI.requestUserInfo(userId).catch(err => console.log(err))
        if (user) {
            for (let id in user.cart) {
                await dispatch(getCartProduct(id, user.cart[id]))
            }
        }
    } else {
        const response = localStorage.getItem('cart')
        if (response) {
            const cart: { [id: string]: number } = JSON.parse(response)
            for (let id in cart) {
                await dispatch(getCartProduct(id, cart[id]))
            }
        }
    }
}

export const getUpdatedUserCart = (userId: string): TThunk => async (dispatch) => {
    const response = localStorage.getItem('cart')
    if (response) {
        const cart: { [id: string]: number } = JSON.parse(response)
        for (let p in cart) {
            await authAPI.addCartProduct(userId, p, cart[p]).catch((err) => console.log(err))
        }
    }
    await dispatch(getUserCart(userId)).catch((err) => console.log(err))
}

export const clearLocalCart = () => (dispatch: Dispatch): void => {
    localStorage.removeItem('cart')
    dispatch(actions.clearCart())
}

export default cartReducer
