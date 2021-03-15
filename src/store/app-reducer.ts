import { TCategories, TGoodsInfo } from '../types/types'
import { TCombineActions, TGlobalState } from './store'
import { ThunkAction } from 'redux-thunk'
import { goodsAPI } from '../api/goods-api'

const SET_CATEGORIES = 'SET_CATEGORIES'

export const initialState = {
    categories: null as TCategories | null,
}

export type TInitialState = typeof initialState

const appReducer = (state = initialState, action: TActions): TInitialState => {
    switch (action.type) {
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
    setCategories: (categories: TCategories) => ({ type: SET_CATEGORIES, payload: { categories } } as const),
}

// Thunks
type TThunk = ThunkAction<void, () => TGlobalState, unknown, TActions>

export const getCategories = (): TThunk => async (dispatch) => {
    const data = await goodsAPI.requestGoodsInfo().catch(err => console.log(err))
    if (data) dispatch(actions.setCategories(data.categories))
}

export default appReducer
