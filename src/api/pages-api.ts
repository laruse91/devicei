import { fireDB } from '../index'

export const contentApi = {
    requestPageContent(page: 'about' | 'home') {
        return fireDB
            .collection('pages')
            .doc(page)
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
