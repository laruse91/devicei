import { TGoods } from '../types/types'
import { TCombineActions, TGlobalState } from './store'
import { ThunkAction } from 'redux-thunk'
import { db, fireDB } from '../index'

const SET_GOODS = 'SET_GOODS'

export const initialState = {
    goods: null as TGoods[] | null,
    total: 30,
}

type TInitialState = typeof initialState

const shopReducer = (state = initialState, action: TActions): TInitialState => {
    switch (action.type) {
        case SET_GOODS:
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
    setGoods: (goods: TGoods[], total: number) => ({ type: SET_GOODS, payload: { goods, total } } as const),
}

// Thunks
type TThunk = ThunkAction<void, () => TGlobalState, unknown, TActions>

export const requestGoods = (currentPage: number = 1, sortKey?: string, limit: number = 12): TThunk => async (
    dispatch
) => {
    let goods = [] as TGoods[]
    let total = 30
    const start = String(currentPage * limit - limit)

    const response = await fireDB.collection('goods').limit(limit).get()
    response.forEach((doc) => {
        goods.push(doc.data() as TGoods)
    })

    await db.ref('goods/total').once('value', (g) => {
        const response = g.val()
        if (response) {
            total = response && response
        }
    })

    dispatch(actions.setGoods(goods, total))
}

export default shopReducer
