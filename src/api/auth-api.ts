import { fireAUTH, fireAuth, fireDB, fireStorage } from '../index'
import { TContacts, TAuthorizedUser, TUpdateData } from '../types/types'

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

    addContacts(userId: string, contacts: TContacts) {
        return fireDB
            .collection('users')
            .doc(userId)
            .set({ contacts: contacts })
            .then(() => true)
            .catch((error) => {
                console.log('Error adding document:', error)
            })
    },

    requestUserInfo(userId: string) {
        return fireDB
            .collection('users')
            .doc(userId)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    return doc.data()
                } else {
                    console.log('No such document!')
                }
            })
            .catch((error) => {
                console.log('Error getting document:', error)
            })
    },
}
