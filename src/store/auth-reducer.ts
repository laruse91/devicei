import { TCombineActions, TGlobalState } from './store'
import { ThunkAction } from 'redux-thunk'
import { authAPI } from '../api/auth-api'
import { TContacts, TAuthorizedUser } from '../types/types'
import { getUserCart } from './cart-reducer'
import { usersAPI } from '../api/users-api'

const SIGN_IN = 'SIGN_IN'
const SIGN_OUT = 'SIGN_OUT'
const SET_AUTHORIZED_USER = 'SET_AUTHORIZED_USER'
const SET_USER_CONTACTS = 'SET_USER_CONTACTS'

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
    const signedUser = await authAPI.signUp(email, password, name)
    if (signedUser) {
        dispatch(actions.signIn())
        dispatch(actions.setAuthorizedUser(signedUser))
        await dispatch(getUserCart(signedUser.userId))
    }
}
export const signIn = (email: string, password: string, rememberMe: boolean): TThunk => async (dispatch) => {
    const authorizedUser = await authAPI.signIn(email, password, rememberMe)
    if (authorizedUser) {
        dispatch(actions.signIn())
        dispatch(actions.setAuthorizedUser(authorizedUser))
        await dispatch(getUserCart(authorizedUser.userId))
    }
}
export const updateUserProfile = (userName?: string, photoUrl?: string): TThunk => async (dispatch) => {
    const updatedUser = await authAPI.updateUserProfile(userName, photoUrl)
    console.log(updatedUser)
    if (updatedUser) dispatch(actions.setAuthorizedUser(updatedUser))
}
export const addUserPhoto = (userId: string, file: Blob | File): TThunk => async (dispatch) => {
    const imageUrl = await authAPI.uploadUserPhoto(userId, file as File)
    imageUrl && (await dispatch(updateUserProfile(undefined, imageUrl)))
}

export const addUserContacts = (userId: string, contacts: TContacts): TThunk => async (dispatch) => {
    const resp = await authAPI.addContacts(userId, contacts)
    if (resp) dispatch(actions.setContacts(contacts))
}
export const getUserContacts = (userId: string): TThunk => async (dispatch) => {
    const user = await usersAPI.requestUser(userId)
    console.log(user)
    if (user) dispatch(actions.setContacts(user.contacts))
}

export default authReducer
