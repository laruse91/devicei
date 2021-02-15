import { fireDB } from '../index'
import { TGoods, TInfo, TTabs } from '../types/types'

export const homeAPI = {
    requestTabGoods(tab: TTabs) {
        let query = fireDB.collection('goods').orderBy('rate', 'asc')
        query = query.where('rate', '>', 4)

        // if (tab === 'sale') {
        //     query = query.where('oldPrice', '>', 0)
        // }
        // if (tab === 'rate') {
        //     query = query.where('rate', '==', 4)
        // }

        return query
            .limit(4)
            .get()
            .then((response) => {
                let data = [] as TGoods[]
                response.forEach((doc) => {
                    data.push(doc.data() as TGoods)
                })
                return data
            })
            .catch((error) => {
                console.log('Error getting document:', error)
            })
    },
}
