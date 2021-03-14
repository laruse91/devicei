import { TCategories, TGoods, TInfo, TProduct } from '../types/types'
import { TCombineActions, TGlobalState } from './store'
import { ThunkAction } from 'redux-thunk'
import { goodsAPI } from '../api/goods-api'
import { part } from '../utils/helpers'

const SET_GOODS = 'SET_GOODS'
const SET_IS_FETCHING = 'SET_IS_FETCHING'

export const initialState = {
    goods: null as TGoods | null,
    categories: null as TCategories | null,
    isFetching: false,
}

export type TInitialState = typeof initialState

const shopReducer = (state = initialState, action: TActions): TInitialState => {
    switch (action.type) {
        case SET_GOODS:
        case SET_IS_FETCHING:
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
    setIsFetching: (isFetching: boolean) => ({ type: SET_IS_FETCHING, payload: { isFetching } } as const),
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
    dispatch(actions.setIsFetching(true))
    // @ts-ignore
    const data: TProduct[] = await goodsAPI.requestGoods(category, price, brands, sort)
    // @ts-ignore
    const info: TInfo = await goodsAPI.requestGoodsInfo(category)

    const goods: TGoods = {
        items: part(currentPage, pageSize, data as TProduct[]),
        total: data.length,
        maximalPrice: info?.maximalPrice,
        brands: info?.brands,
    }
    dispatch(actions.setGoods(goods))
    dispatch(actions.setIsFetching(false))
}

export default shopReducer
