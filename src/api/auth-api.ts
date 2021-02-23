import { fireAUTH, fireAuth } from '../index'
import { TAuthorizedUser } from '../types/types'

export const authAPI = {
    signUp(email: string, password: string) {
        return fireAuth.setPersistence(fireAUTH.Persistence.SESSION).then(() => {
            return fireAuth.createUserWithEmailAndPassword(email, password).then((credentials) => credentials.user)
        })
    },

    signIn(email: string, password: string, rememberMe: boolean) {
        const remember: 'SESSION' | 'LOCAL' = rememberMe ? 'LOCAL' : 'SESSION'
        return fireAuth.setPersistence(fireAUTH.Persistence[remember]).then(() => {
            return fireAuth.signInWithEmailAndPassword(email, password).then((credential) => credential.user)
        })
    },

    updateUserProfile(name: string) {
        return fireAuth.currentUser
            ?.updateProfile({
                displayName: name,
            })
            .then(() => 'Update successful')
    },

    getUserProfile() {
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
}
