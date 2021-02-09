import { TCombineActions, TGlobalState } from './store'
import { ThunkAction } from 'redux-thunk'
import { db } from '../index'
import { TCarousel, TGood, TNews } from '../types/types'

const SET_CATEGORIES = 'SET_CATEGORIES'
const SET_DATA = 'SET_DATA'

export const initialState = {
    carousel: null as TCarousel[] | null,
    features: null as TGood[] | null,
    sale: null as TGood[] | null,
    categories: null as TGood[] | null,
    bigSale: null as TGood[] | null,
    news: null as TNews[] | null,
}

type TInitialState = typeof initialState

const homeReducer = (state = initialState, action: TActions): TInitialState => {
    switch (action.type) {
        case SET_DATA:
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
        features: TGood[] | null,
        sale: TGood[] | null,
        bigSale: TGood[] | null,
        news: TNews[] | null,
        categories: TGood[] | null
    ) =>
        ({
            type: SET_DATA,
            payload: { carousel, features, sale, bigSale, news, categories },
        } as const),
}

// Thunks
type TThunk = ThunkAction<Promise<void>, () => TGlobalState, unknown, TActions>

export const requestData = (): TThunk => async (dispatch) => {
    let carousel: TCarousel[] | null = null
    let features: TGood[] | null = null
    let sale: TGood[] | null = null
    let bigSale: TGood[] | null = null
    let news: TNews[] | null = null
    let categories: TGood[] | null = null
    const dat = db.ref('carousel')
    await dat.once('value', (bg) => {
        carousel = bg.val()
    })
    await db.ref('features').once('value', (g) => {
        features = Object.values(g.val())
    })
    await db.ref('goods/sale').once('value', (g) => {
        sale = Object.values(g.val())
    })
    await db.ref('bigSale').once('value', (g) => {
        bigSale = Object.values(g.val())
    })
    await db.ref('news').once('value', (n) => {
        news = Object.values(n.val())
    })
    await db.ref('goods/sale').once('value', (n) => {
        categories = Object.values(n.val())
    })

    dispatch(actions.setData(carousel, features, sale, bigSale, news, categories))
}

export default homeReducer
