import { TCombineActions, TGlobalState } from './store'
import { ThunkAction } from 'redux-thunk'
import { db } from '../index'
import { superSaleOfDay, TCarousel, TProduct, TNews, TTabGoods } from '../types/types'
import { fillArray } from '../utils/helpers'
import { homeAPI } from '../api/home-api'

const SET_TAB_GOODS = 'SET_TAB_GOODS'
const SET_DATA = 'SET_DATA'

export const initialState = {
    carousel: null as TCarousel[] | null,
    features: null as TProduct[] | null,
    sale: null as TProduct[] | null,
    tabGoods: null as TTabGoods | null,
    superSaleOfDay: null as superSaleOfDay | null,
    news: null as TNews[] | null,
}

export type TInitialState = typeof initialState

const homeReducer = (state = initialState, action: TActions): TInitialState => {
    switch (action.type) {
        case SET_DATA:
        case SET_TAB_GOODS:
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
    setData: (
        carousel: TCarousel[] | null,
        features: TProduct[] | null,
        sale: TProduct[] | null,
        superSaleOfDay: superSaleOfDay | null,
        news: TNews[] | null
    ) => ({ type: SET_DATA, payload: { carousel, features, sale, superSaleOfDay, news } } as const),
    setTabGoods: (tabGoods: TTabGoods) => ({ type: SET_TAB_GOODS, payload: { tabGoods } } as const),
}

// Thunks
type TThunk = ThunkAction<void, () => TGlobalState, unknown, TActions>

export const requestTabGoods = (limit = 4): TThunk => async (dispatch) => {
    let tabGoods = {} as TTabGoods
    // @ts-ignore
    tabGoods['sale'] = await homeAPI.requestTabGoods('sale', limit)
    // @ts-ignore
    tabGoods['rate'] = await homeAPI.requestTabGoods('rate', limit)

    tabGoods.sale && tabGoods.sale && dispatch(actions.setTabGoods(tabGoods))
}
export const requestData = (): TThunk => (dispatch) => {
    let carousel: TCarousel[] | null = null
    let features: TProduct[] | null = null
    let sale: TProduct[] | null = null
    let superSaleOfDay: superSaleOfDay | null = null
    let news: TNews[] | null = null

    Promise.all([
        db.ref('carousel').once('value', (bg) => {
            carousel = bg.val()
        }),
        db.ref('features').once('value', (g) => {
            features = Object.values(g.val())
        }),
        db.ref('goods').once('value', (g) => {
            sale = fillArray(Object.values(g.val().sale), 3)
            superSaleOfDay = g.val().superSaleOfDay
        }),
        db.ref('news').once('value', (n) => {
            news = fillArray(Object.values(n.val()), 3)
        }),
    ]).then(() => {
        dispatch(actions.setData(carousel, features, sale, superSaleOfDay, news))
    })
}

export default homeReducer
