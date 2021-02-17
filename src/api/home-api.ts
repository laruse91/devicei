import { fireDB } from '../index'
import { TProduct, TTabs } from '../types/types'

export const homeAPI = {
    requestTabGoods(tab: TTabs, limit: number) {
        let collection = fireDB.collection('goods')
        let query
        if (tab === 'sale') {
            query = collection.where('oldPrice', '>', 0)
        }
        if (tab === 'rate') {
            query = collection.where('rate', '==', 5)
        }
        if (query) {
            return query
                .limit(limit)
                .get()
                .then((response) => {
                    let data = [] as TProduct[]
                    response.forEach((doc) => {
                        data.push(doc.data() as TProduct)
                    })
                    return data
                })
                .catch((error) => {
                    console.log('Error getting document:', error)
                })
        }
    },
}
