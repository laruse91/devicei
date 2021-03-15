import { TCombineActions, TGlobalState } from './store'
import { ThunkAction } from 'redux-thunk'
import { TCarousel, TGroup, THome, TNews, TProduct, TSales, TTabs } from '../types/types'
import { newsAPI } from '../api/news-api'
import { contentApi } from '../api/content-api'
import { goodsAPI } from '../api/goods-api'

const SET_GOODS = 'SET_TAB_GOODS'
const SET_DATA = 'SET_DATA'
const SET_NEWS = 'SET_NEWS'
const SET_SALE_GOODS = 'SET_SALE_GOODS'
const REMOVE_LOADING = 'REMOVE_LOADING'

export const initialState = {
    carousel: null as TCarousel[] | null,
    features: null as TProduct[] | null,
    tabGoods: null as { [key in TTabs]: TProduct[] } | null,
    saleGoods: null as { [key in TSales]: TProduct[] } | null,
    popularNews: null as TNews[] | null,
    isLoading: true,
}
export type TInitialState = typeof initialState

const homeReducer = (state = initialState, action: TActions): TInitialState => {
    switch (action.type) {
        case SET_DATA:
        case SET_NEWS:
        case SET_SALE_GOODS:
        case SET_GOODS:
            return {
                ...state,
                ...action.payload,
            }

        case REMOVE_LOADING:
            return {
                ...state,
                isLoading: false,
            }

        default:
            return state
    }
}

// ActionCreators
type TActions = TCombineActions<typeof actions>

const actions = {
    setData: (carousel: TCarousel[], features: TProduct[]) =>
        ({ type: SET_DATA, payload: { carousel, features } } as const),
    setTabGoods: (tabGoods: { [key in TTabs]: TProduct[] }) => ({ type: SET_GOODS, payload: { tabGoods } } as const),
    setNews: (popularNews: TNews[]) => ({ type: SET_NEWS, payload: { popularNews } } as const),
    setSaleGoods: (saleGoods: { [key in TSales]: TProduct[] }) =>
        ({ type: SET_SALE_GOODS, payload: { saleGoods } } as const),
    removeLoading: () => ({ type: REMOVE_LOADING } as const),
}

// Thunks
type TThunk = ThunkAction<void, () => TGlobalState, unknown, TActions>

export const getGoods = (groups: TGroup[], limit = 4, tag: 'tab' | 'sale'): TThunk => async (dispatch) => {
    let goods = {} as { [key in TGroup]: TProduct[] }

    for (let g of groups) {
        const response = await goodsAPI.requestGoods(undefined, undefined, [], 'asc', g, limit)
        if (response) goods[g] = response
    }
    if (tag === 'tab') dispatch(actions.setTabGoods(goods))
    if (tag === 'sale') dispatch(actions.setSaleGoods(goods))
}

export const getNews = (): TThunk => async (dispatch) => {
    const popularNews = await newsAPI.requestNews(3).catch((err) => console.log(err))
    popularNews && dispatch(actions.setNews(popularNews))
}

export const getHomeData = (): TThunk => async (dispatch) => {
    const response = await contentApi.requestContent('home').catch(err=>console.log(err)) as THome
    if (response ) {
        const carousel: TCarousel[] = response.carousel
        const features: TProduct[] = response.features
        dispatch(actions.setData(carousel, features))
    }
    await dispatch(getGoods(['sale', 'saleOfDay'], 3, 'sale'))
    await dispatch(getNews())
    await dispatch(actions.removeLoading())
}

export default homeReducer
