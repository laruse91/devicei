import { TAbout, TFaq, THome } from '../types/types'
import { TCombineActions, TGlobalState } from './store'
import { ThunkAction } from 'redux-thunk'
import { contentApi } from '../api/content-api'

const SET_ABOUT = 'content/SET_CONTENT'
const SET_FAQ = 'content/SET_FAQ'

export const initialState = {
    about: null as TAbout | null,
    faq: null as TFaq | null,
}

export type TInitialState = typeof initialState

const contentReducer = (state = initialState, action: TActions): TInitialState => {
    switch (action.type) {
        case SET_ABOUT:
        case SET_FAQ:
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
    setAbout: (about: TAbout) => ({ type: SET_ABOUT, payload: { about } } as const),
    setFaq: (faq: TFaq) => ({ type: SET_FAQ, payload: { faq } } as const),
}

// Thunks
type TThunk = ThunkAction<void, () => TGlobalState, unknown, TActions>

export const getPageContent = (page: 'about' | 'faq'): TThunk => async (dispatch) => {
    const data  = await contentApi.requestContent(page).catch((err)=>console.log(err))
       if (data && page === 'about')  dispatch(actions.setAbout(data as TAbout))
       if (data && page === 'faq')  dispatch(actions.setFaq(data as TFaq))
}

export default contentReducer
