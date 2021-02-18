import { fireDB } from '../index'
import { TProduct, TNews } from '../types/types'

export const newsAPI = {
    requestNews(limit: number) {
        return fireDB
            .collection('news')
            .orderBy('date', 'asc')
            .limit(limit)
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
}
