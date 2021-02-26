import { TCombineActions, TGlobalState } from './store'
import { ThunkAction } from 'redux-thunk'
import { authAPI } from '../api/auth-api'
import { TAuthorizedUser } from '../types/types'
import { getUserCart } from './cart-reducer'

const SIGN_IN = 'SIGN_IN'
const SIGN_OUT = 'SIGN_OUT'
const SET_AUTHORIZED_USER = 'SET_AUTHORIZED_USER'

export const initialState = {
    isAuth: false,
    authorizedUser: null as TAuthorizedUser | null,
}

export type TInitialState = typeof initialState

const authReducer = (state = initialState, action: TActions): TInitialState => {
    switch (action.type) {
        case SIGN_IN:
            return {
                ...state,
                isAuth: true,
            }
        case SIGN_OUT:
            return {
                ...state,
                isAuth: false,
                authorizedUser: null,
            }
        case SET_AUTHORIZED_USER:
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

export const actions = {
    signIn: () => ({ type: SIGN_IN } as const),
    signOut: () => ({ type: SIGN_OUT } as const),
    setAuthorizedUser: (authorizedUser: TAuthorizedUser | null) =>
        ({ type: SET_AUTHORIZED_USER, payload: { authorizedUser } } as const),
}

// Thunks
type TThunk = ThunkAction<Promise<void>, () => TGlobalState, unknown, TActions>

export const signUp = (email: string, password: string, name: string): TThunk => async (dispatch) => {
    const signed = await authAPI.signUp(email, password)
    if (signed) dispatch(actions.signIn())

    await authAPI.updateUserProfile(name)

    const authorizedUser = await authAPI.getUserProfile()
    if (authorizedUser) {
        dispatch(actions.setAuthorizedUser(authorizedUser))
        await dispatch(getUserCart(authorizedUser.userId))
    }
}

export const signIn = (email: string, password: string, rememberMe: boolean): TThunk => async (dispatch) => {
    const signed = await authAPI.signIn(email, password, rememberMe)
    if (signed) dispatch(actions.signIn())

    const authorizedUser = await authAPI.getUserProfile()
    if (authorizedUser) {
        dispatch(actions.setAuthorizedUser(authorizedUser))
        await dispatch(getUserCart(authorizedUser.userId))
    }
}

export default authReducer
