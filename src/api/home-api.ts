import { fireDB } from '../index'
import { TGroup, TProduct } from '../types/types'

export const homeAPI = {
    requestGoods(group: TGroup, limit: number) {
        let collection = fireDB.collection('goods')
        let query
        if (group === 'rate') {
            query = collection.where('rate', '==', 5)
        } else {
            query = collection.where('group', '==', group)
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
                    if (data) return data
                })
                .catch((error) => {
                    console.log('Error getting document:', error)
                })
        }
    },
    requestData() {
        return fireDB
            .collection('home')
            .doc('data')
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
