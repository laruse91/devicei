import { fireDB } from '../index'
import { TGoods } from '../types/types'

export const goodsAPI = {
    requestGoods(category: string | undefined, price: number[], brands: string[], sort: 'desc' | 'asc') {
        let query = fireDB.collection('goods').orderBy('price', sort)
        if (category) {
            query = query.where('category', '==', category)
        }
        if (brands.length) {
            query = query.where('brand', 'in', brands)
        }
        if (price.length) {
            query = query.where('price', '>=', price[0]).where('price', '<=', price[1])
        }

        return query
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
    requestInfo(category: string | undefined) {
        const document = !category ? 'all' : category
        return fireDB
            .collection('info')
            .doc(document)
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
