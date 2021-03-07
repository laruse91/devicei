import { fireDB } from '../index'
import { TNews } from '../types/types'

export const newsAPI = {
    requestNews(limit?: number) {
        return fireDB
            .collection('news')
            .orderBy('date', 'asc')
            .limit(limit || 20)
            .get()
            .then((response) => {
                let data = [] as TNews[]
                response.forEach((doc) => {
                    data.push(doc.data() as TNews)
                })
                return data
            })
            .catch((error) => {
                console.log('Error getting document:', error)
            })
    },
    requestArticle(id: string) {
        return fireDB
            .collection('news')
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
}
