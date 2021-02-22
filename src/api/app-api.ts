import { fireDB } from '../index'

export const appAPI = {
    requestCategories() {
        return fireDB
            .collection('info')
            .doc('all')
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
