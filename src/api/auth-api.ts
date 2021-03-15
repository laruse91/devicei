import { fireAUTH, fireAuth, fireStorage } from '../index'
import { TAuthorizedUser, TContacts, TUpdateData, TUserInfo } from '../types/types'
import { dbInstance } from './api'

export const authAPI = {
    signUp(email: string, password: string, name: string) {
        return fireAuth.setPersistence(fireAUTH.Persistence.SESSION).then(() => {
            return fireAuth
                .createUserWithEmailAndPassword(email, password)
                .then((credentials) => credentials.user)
                .then(() => this.updateUserProfile(name))
                .then(() => this.requestUserProfile())
        })
    },
    signIn(email: string, password: string, rememberMe: boolean) {
        const remember: 'SESSION' | 'LOCAL' = rememberMe ? 'LOCAL' : 'SESSION'
        return fireAuth.setPersistence(fireAUTH.Persistence[remember]).then(() => {
            return fireAuth
                .signInWithEmailAndPassword(email, password)
                .then((credential) => credential.user)
                .then(() => this.requestUserProfile())
        })
    },

    updateUserProfile(displayName?: string, photoURL?: string) {
        const data = {} as TUpdateData
        if (displayName) data.displayName = displayName
        if (photoURL) data.photoURL = photoURL
        return fireAuth.currentUser?.updateProfile(data).then(() => this.requestUserProfile())
    },
    uploadUserPhoto(userId: string, file: File) {
        const type = file.type.split('/')[1]
        return fireStorage
            .ref()
            .child(`users/${userId}.${type}`)
            .put(file)
            .then((snapshot) => {
                return snapshot.ref.getDownloadURL().then((downloadURL: string) => {
                    return downloadURL
                })
            })
            .catch((error) => {
                console.log('Error adding document:', error)
            })
    },
    requestUserProfile() {
        const userData = fireAuth.currentUser
        if (userData) {
            const user: TAuthorizedUser = {
                name: userData.displayName,
                email: userData.email,
                photoURL: userData.photoURL,
                userId: userData.uid,
            }
            return user
        }
    },

    requestUserInfo(id: string) {
        return dbInstance
            .get<TUserInfo>(`users/${id}.json`)
            .then((response) => {
                const { data } = response
                return data
            })
    },
    addCartProduct(userId: string, productId: string, quantity: number) {
        return dbInstance
            .patch<{[id:string]: number}>(`users/${userId}/cart.json`, { [productId]: quantity })
            .then((response) => response)
    },
    removeCartProduct(userId: string, productId: string) {
        return dbInstance.delete(`users/${userId}/cart/${productId}.json`)
            .then(() => true)
    },
    addContacts(userId: string, contacts: TContacts) {
        return dbInstance
            .patch<TContacts>(`users/${userId}/contacts.json`, { ...contacts })
            .then((response) => {
                const {data} = response
                return data
            })
    },
}
