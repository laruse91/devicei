import { TCombineActions, TGlobalState } from './store'
import { ThunkAction } from 'redux-thunk'
import { usersAPI } from '../api/users-api'
import { goodsAPI } from '../api/goods-api'
import { TCart } from '../types/types'

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
                cart: [],
            }
        case UPDATE_QUANTITY:
            return {
                ...state,
                cart: state.cart.map((o) => {
                    if (o.id === action.productId) {
                        o.quantity = o.quantity + action.n
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
    updateQuantity: (productId: string, n: 1 | -1) => ({ type: UPDATE_QUANTITY, productId, n } as const),
    clearCart: () => ({ type: CLEAR_CART } as const),
}

// Thunks
type TThunk = ThunkAction<Promise<void>, () => TGlobalState, unknown, TActions>

export const addProductToCart = (userId: string | undefined, product: TCart): TThunk => async (dispatch) => {
    if (userId) {
        const resp = userId && (await usersAPI.addCartProduct(userId, product.id, product.quantity))
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
        const resp = await usersAPI.removeCartProduct(userId, productId)
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
export const updateQuantity = (userId: string | undefined, productId: string, n: 1 | -1): TThunk => async (
    dispatch
) => {
    const resp = userId && (await usersAPI.updateQuantity(userId, productId, n))
    if (resp) dispatch(actions.updateQuantity(productId, n))
}

export const getCartProduct = (id: string, quantity: number): TThunk => async (dispatch) => {
    const product = await goodsAPI.requestProduct(id)
    if (product) {
        const cartProduct: TCart = {
            id: product.id,
            quantity: quantity,
            image: product.image,
            name: product.name,
            price: product.price,
        }
        dispatch(actions.addToCart(cartProduct))
    }
}

export const getUserCart = (userId?: string | null): TThunk => async (dispatch) => {
    if (userId) {
        const user = await usersAPI.requestUser(userId)
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

export default cartReducer
