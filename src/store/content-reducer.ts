import { TAbout, TCategories } from '../types/types'
import { TCombineActions, TGlobalState } from './store'
import { ThunkAction } from 'redux-thunk'
import { appAPI } from '../api/app-api'
import { contentApi } from '../api/pages-api'

const SET_CONTENT = 'SET_CONTENT'

export const initialState = {
    about: null as TAbout | null,
}

export type TInitialState = typeof initialState

const contentReducer = (state = initialState, action: TActions): TInitialState => {
    switch (action.type) {
        case SET_CONTENT:
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
    setContent: (about: TAbout) => ({ type: SET_CONTENT, payload: { about } } as const),
}

// Thunks
type TThunk = ThunkAction<void, () => TGlobalState, unknown, TActions>

export const getAbout = (): TThunk => async (dispatch) => {
    const about = await contentApi.requestPageContent('about')
    dispatch(actions.setContent(about as TAbout))
}

export default contentReducer
