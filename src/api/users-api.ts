import { fireDB, firestore } from '../index'

export const usersAPI = {
    requestUser(id: string) {
        return fireDB
            .collection('users')
            .doc(id)
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
    addCartProduct(userId: string, productId: string, quantity: number) {
        return fireDB
            .collection('users')
            .doc(userId)
            .update({ [`cart.${productId}`]: quantity })
            .then(() => true)
            .catch((error) => {
                console.log('Error adding document:', error)
            })
    },

    removeCartProduct(userId: string, productId: string) {
        return fireDB
            .collection('users')
            .doc(userId)
            .update({ [`cart.${productId}`]: firestore.FieldValue.delete() })
            .then(() => true)
            .catch((error) => {
                console.log('Error adding document:', error)
            })
    },

    updateQuantity(userId: string, productId: string, n: 1 | -1) {
        return fireDB
            .collection('users')
            .doc(userId)
            .update({ [`cart.${productId}`]: firestore.FieldValue.increment(n) })
            .then(() => true)
            .catch((error) => {
                console.log('Error adding document:', error)
            })
    },
}
