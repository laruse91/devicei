import { TCategories, TProduct, TInfo, TGoods } from '../types/types'
import { TCombineActions, TGlobalState } from './store'
import { ThunkAction } from 'redux-thunk'
import { goodsAPI } from '../api/goods-api'
import { part } from '../utils/helpers'

const SET_GOODS = 'SET_GOODS'
const SET_CATEGORIES = 'SET_CATEGORIES'

export const initialState = {
    goods: null as TGoods | null,
    categories: null as TCategories | null,
}

export type TInitialState = typeof initialState

const shopReducer = (state = initialState, action: TActions): TInitialState => {
    switch (action.type) {
        case SET_GOODS:
        case SET_CATEGORIES:
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
    setGoods: (goods: TGoods) => ({ type: SET_GOODS, payload: { goods } } as const),
    setCategories: (categories: TCategories) => ({ type: SET_CATEGORIES, payload: { categories } } as const),
}

// Thunks
type TThunk = ThunkAction<void, () => TGlobalState, unknown, TActions>

export const getGoods = (
    category: string | undefined,
    price: [number, number] | undefined,
    brands: string[],
    sort: 'desc' | 'asc',
    currentPage: number,
    pageSize: number = 12
): TThunk => async (dispatch) => {
    // @ts-ignore
    const data: TProduct[] = await goodsAPI.requestGoods(category, price, brands, sort)
    // @ts-ignore
    const info: TInfo = await goodsAPI.requestInfo(category)

    const goods: TGoods = {
        items: part(currentPage, pageSize, data as TProduct[]),
        total: data.length,
        maximalPrice: info?.maximalPrice,
        brands: info?.brands,
    }
    dispatch(actions.setGoods(goods))
}
export const getCategories = (): TThunk => async (dispatch) => {
    const data = await goodsAPI.requestCategories()
    // @ts-ignore
    dispatch(actions.setCategories(data.categories))
}

export default shopReducer
