import { fireDB } from '../index'
import { TGoodsInfo, TGroup, TProduct } from '../types/types'
import { instance } from './api'
// @ts-ignore
import FireStoreParser from 'firestore-parser'

export const goodsAPI = {
    requestGoods(
        category: string | undefined,
        price: [number, number] | undefined,
        brands: string[],
        sort: 'desc' | 'asc',
        group? : TGroup,
        limit : number= 100
    ) {
        let query = fireDB.collection('goods').orderBy('price', sort)
        if (category) {
            query = query.where('category', '==', category)
        }
        if (brands.length) {
            query = query.where('brand', 'in', brands)
        }
        if (price) {
            query = query.where('price', '>=', price[0]).where('price', '<=', price[1])
        }
        if (group && group === 'rate') {
            query = query.where('rate', '==', 5)
        }
        if (group && group !== 'rate') {
            query = query.where('group', '==', group)
        }

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
    },

    requestGoodsInfo(category: string = 'all') {
        return instance
            .get<TGoodsInfo>(`documents/info/${category}`)
            .then(response => FireStoreParser(response.data).fields as TGoodsInfo)
    },

    requestProduct(id: string) {
        return instance
            .get<TProduct>(`documents/goods/${id}`)
            .then(response => FireStoreParser(response.data).fields as TProduct)
    },
}
