import { TCombineActions, TGlobalState } from './store'
import { ThunkAction } from 'redux-thunk'
import { authAPI } from '../api/auth-api'
import { TAuthorizedUser, TContacts } from '../types/types'
import { getUserCart } from './cart-reducer'

const SIGN_IN = 'auth/SIGN_IN'
const SIGN_OUT = 'auth/SIGN_OUT'
const SET_AUTHORIZED_USER = 'auth/SET_AUTHORIZED_USER'
const SET_USER_CONTACTS = 'auth/SET_USER_CONTACTS'

export const initialState = {
    isAuth: false,
    authorizedUser: null as TAuthorizedUser | null,
    contacts: null as TContacts | null,
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
                contacts: null
            }
        case SET_AUTHORIZED_USER:
        case SET_USER_CONTACTS:
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
    setContacts: (contacts: TContacts) => ({ type: SET_USER_CONTACTS, payload: { contacts } } as const),
}

// Thunks
type TThunk = ThunkAction<Promise<void>, () => TGlobalState, unknown, TActions>

export const signUp = (email: string, password: string, name: string): TThunk => async (dispatch) => {
    const signedUser = await authAPI.signUp(email, password, name).catch(err=>console.log(err))
    if (signedUser) {
        dispatch(actions.signIn())
        dispatch(actions.setAuthorizedUser(signedUser))
        await dispatch(getUserCart(signedUser.userId))
    }
}
export const signIn = (email: string, password: string, rememberMe: boolean): TThunk => async (dispatch) => {
    const authorizedUser = await authAPI.signIn(email, password, rememberMe).catch(err=>console.log(err))
    if (authorizedUser) {
        dispatch(actions.signIn())
        dispatch(actions.setAuthorizedUser(authorizedUser))
        await dispatch(getUserCart(authorizedUser.userId))
    }
}
export const updateUserProfile = (userName?: string, photoUrl?: string): TThunk => async (dispatch) => {
    const updatedUser = await authAPI.updateUserProfile(userName, photoUrl)?.catch(err=>console.log(err))
    if (updatedUser) dispatch(actions.setAuthorizedUser(updatedUser))
}
export const addUserPhoto = (userId: string, file: File): TThunk => async (dispatch) => {
    const photoUrl: string = await authAPI.uploadUserPhoto(userId, file).catch(err=>console.log(err))
    photoUrl && (await dispatch(updateUserProfile(undefined, photoUrl)))
}

export const addUserContacts = (userId: string, contacts: TContacts): TThunk => async (dispatch) => {
    const response = await authAPI.addContacts(userId, contacts).catch(err => console.log(err))
    if (response) dispatch(actions.setContacts(response))
}
export const getUserContacts = (userId: string): TThunk => async (dispatch) => {
    const user = await authAPI.requestUserInfo(userId).catch(err => console.log(err))
    if (user) dispatch(actions.setContacts(user.contacts))
}

export default authReducer
