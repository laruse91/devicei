import { TCombineActions, TGlobalState } from './store'
import { ThunkAction } from 'redux-thunk'
import { authAPI } from '../api/auth-api'
import { TAuthorizedUser } from '../types/types'

const SET_AUTHORIZED_USER = 'SET_AUTHORIZED_USER'
const SIGN_IN = 'SIGN_IN'
const SIGN_OUT = 'SIGN_OUT'

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
            }
        case SET_AUTHORIZED_USER:
            return {
                ...state,
                authorizedUser: action.payload,
            }

        default:
            return state
    }
}

// ActionCreators
type TActions = TCombineActions<typeof actions>

const actions = {
    signIn: () => ({ type: SIGN_IN } as const),
    signOut: () => ({ type: SIGN_OUT } as const),
    setAuthorizedUser: (user: TAuthorizedUser | null) => ({ type: SET_AUTHORIZED_USER, payload: user } as const),
}

// Thunks
type TThunk = ThunkAction<void, () => TGlobalState, unknown, TActions>

export const signUp = (email: string, password: string, name: string): TThunk => async (dispatch) => {
    const signed = await authAPI.signUp(email, password).catch(catchError)
    if (signed) dispatch(actions.signIn())

    await authAPI.updateUserProfile(name)?.catch(catchError)

    const authorizedUser = await authAPI.getUserProfile()
    if (authorizedUser) dispatch(actions.setAuthorizedUser(authorizedUser))
}

export const signIn = (email: string, password: string): TThunk => async (dispatch) => {
    const signed = await authAPI.signIn(email, password).catch(catchError)

    if (signed) dispatch(actions.signIn())
    const authorizedUser = await authAPI.getUserProfile()
    if (authorizedUser) dispatch(actions.setAuthorizedUser(authorizedUser))
}

function catchError(error: any) {
    const errorCode = error.code
    const errorMessage = error.message
    console.log('code: ' + errorCode)
    console.log('message: ' + errorMessage)
}

export default authReducer
