import { TCategories, TGoods, TProduct, TReview } from '../types/types'
import { TCombineActions, TGlobalState } from './store'
import { ThunkAction } from 'redux-thunk'
import { goodsAPI } from '../api/goods-api'
import { part } from '../utils/helpers'

const SET_GOODS = 'shop/SET_GOODS'
const SET_IS_FETCHING = 'shop/SET_IS_FETCHING'
const SET_PRODUCT = 'shop/SET_PRODUCT'
const SET_COMMENT = 'shop/SET_COMMENT'
const ADD_COMMENT = 'shop/ADD_COMMENT'

export const initialState = {
    goods: null as TGoods | null,
    categories: null as TCategories | null,
    product: null as TProduct | null,
    reviews: null as { [id: string]: TReview } | null,
    isFetching: false,
}

export type TInitialState = typeof initialState

const shopReducer = (state = initialState, action: TActions): TInitialState => {
    switch (action.type) {
        case SET_GOODS:
        case SET_PRODUCT:
        case SET_IS_FETCHING:
        case SET_COMMENT:
            return {
                ...state,
                ...action.payload,
            }

        case ADD_COMMENT:
            return {
                ...state,
                reviews: { ...state.reviews, ...action.payload },
            }
        default:
            return state
    }
}

// ActionCreators
type TActions = TCombineActions<typeof actions>

const actions = {
    setGoods: (goods: TGoods) => ({ type: SET_GOODS, payload: { goods } } as const),
    setProduct: (product: TProduct) => ({ type: SET_PRODUCT, payload: { product } } as const),
    setReviews: (reviews: { [id: string]: TReview } ) => ({ type: SET_COMMENT, payload: { reviews } } as const),
    addReview: (review: { [id: string]: TReview }) => ({ type: ADD_COMMENT, payload: review } as const),
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
    pageSize: number = 12,
): TThunk => async (dispatch) => {

    dispatch(actions.setIsFetching(true))
    const data = await goodsAPI.requestGoods(category, price, brands, sort).catch(err => console.log(err))
    const info = await goodsAPI.requestGoodsInfo(category).catch(err => console.log(err))
    if (data && info) {
        const goods: TGoods = {
            items: part(currentPage, pageSize, data as TProduct[]),
            total: data.length,
            maximalPrice: info?.maximalPrice,
            brands: info?.brands,
        }
        dispatch(actions.setGoods(goods))
    }
    dispatch(actions.setIsFetching(false))
}

export const getProduct = (productId: string): TThunk => async (dispatch) => {
    const product = await goodsAPI.requestProduct(productId).catch((err) => console.log(err))
    if (product) dispatch(actions.setProduct(product))
}

export const getReviews = (productId: string): TThunk => async (dispatch) => {
    const response = await goodsAPI.requestReviews(productId).catch((err) => console.log(err))
    if (response) dispatch(actions.setReviews(response))
}
export const addReview = (productId: string, review: TReview): TThunk => async (dispatch) => {
    const response = await goodsAPI.addReview(productId, review).catch((err) => console.log(err))
    if (response) dispatch(actions.addReview(response))
}

export default shopReducer


// upload data to firestore
//-----------------------
// for (let id in pages) {
//     // @ts-ignore
//     await fireDB.collection('pages').doc(id).set(pages[id])
// }