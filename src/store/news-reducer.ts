import { TCombineActions, TGlobalState } from './store'
import { ThunkAction } from 'redux-thunk'
import { TNews } from '../types/types'
import { newsAPI } from '../api/news-api'

const SET_NEWS = 'news/SET_NEWS'
const SET_ARTICLE = 'news/SET_ARTICLE'

export const initialState = {
    news: null as TNews[] | null,
    article: null as TNews | null,
}
export type TInitialState = typeof initialState

const newsReducer = (state = initialState, action: TActions): TInitialState => {
    switch (action.type) {
        case SET_NEWS:
        case SET_ARTICLE:
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
    setNews: (news: TNews[]) => ({ type: SET_NEWS, payload: { news } } as const),
    setArticle: (article: TNews) => ({ type: SET_ARTICLE, payload: { article } } as const),
}

// Thunks
type TThunk = ThunkAction<void, () => TGlobalState, unknown, TActions>

export const getNews = (): TThunk => async (dispatch) => {
    const response = await newsAPI.requestNews().catch((err) => console.log(err))
    response && dispatch(actions.setNews(response))
}
export const getArticle = (id: string): TThunk => async (dispatch) => {
    const response = await newsAPI.requestArticle(id).catch((err) => console.log(err))
    response && dispatch(actions.setArticle(response))
}

export default newsReducer
