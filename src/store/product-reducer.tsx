import { TCategories, TProduct, TInfo, TGoods } from '../types/types'
import { TCombineActions, TGlobalState } from './store'
import { ThunkAction } from 'redux-thunk'
import { goodsAPI } from '../api/goods-api'
import { part } from '../utils/helpers'
import { fireDB } from '../index'

const SET_PRODUCT = 'SET_PRODUCT'

export const initialState = {
    product: null as TProduct | null,
}

export type TInitialState = typeof initialState

const productReducer = (state = initialState, action: TActions): TInitialState => {
    switch (action.type) {
        case SET_PRODUCT:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}

// ActionCreators
type TActions = TCombineActions<typeof actions>

const actions = {
    setGoods: (product: TProduct) => ({ type: SET_PRODUCT, payload: { product } } as const),
}

// Thunks
type TThunk = ThunkAction<void, () => TGlobalState, unknown, TActions>

export const getProduct = (id: string): TThunk => async (dispatch) => {
    // @ts-ignore
    const product: TProduct = await goodsAPI.requestProduct(id)

    // for (let id in home) {
    //     // @ts-ignore
    //     await fireDB.collection('home').doc(id).set(home[id])
    // }
    if (product) dispatch(actions.setGoods(product))
}

export default productReducer
