import { TCombineActions, TGlobalState } from './store'
import { ThunkAction } from 'redux-thunk'
import { db } from '../index'
import { superSaleOfDay, TCarousel, TGoods, TNews, TTabGoods } from '../types/types'
import { fillArray } from '../utils/helpers'

const SET_TAB_GOODS = 'SET_TAB_GOODS'
const SET_DATA = 'SET_DATA'

export const initialState = {
    carousel: null as TCarousel[] | null,
    features: null as TGoods[] | null,
    sale: null as TGoods[] | null,
    tabGoods: null as TTabGoods | null,
    superSaleOfDay: null as superSaleOfDay | null,
    news: null as TNews[] | null,
}

type TInitialState = typeof initialState

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
        features: TGoods[] | null,
        sale: TGoods[] | null,
        superSaleOfDay: superSaleOfDay | null,
        news: TNews[] | null
    ) => ({ type: SET_DATA, payload: { carousel, features, sale, superSaleOfDay, news } } as const),
    setTabGoods: (tabGoods: TTabGoods) => ({ type: SET_TAB_GOODS, payload: { tabGoods } } as const),
}

// Thunks
type TThunk = ThunkAction<void, () => TGlobalState, unknown, TActions>

export const requestTabGoods = (): TThunk => async (dispatch) => {
    let tabGoods = {} as TTabGoods
    await db.ref('goods').once('value', (g) => {
        tabGoods['recent'] = fillArray(Object.values(g.val().recent), 4)
        tabGoods['topRated'] = fillArray(Object.values(g.val().topRated), 4)
        tabGoods['sale'] = fillArray(Object.values(g.val().sale), 4)
    })
    dispatch(actions.setTabGoods(tabGoods))
}
export const requestData = (): TThunk => (dispatch) => {
    let carousel: TCarousel[] | null = null
    let features: TGoods[] | null = null
    let sale: TGoods[] | null = null
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
