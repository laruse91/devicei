import { instance } from './api'
import { TNews } from '../types/types'
// @ts-ignore
import FireStoreParser from 'firestore-parser'

export const newsAPI = {
    requestArticle(id: string) {
        return instance
            .get<TNews>(`documents/news/${id}`)
            .then(response => FireStoreParser(response.data).fields as TNews)
    },
    requestNews(limit?: number) {
        return instance
            .get<TNews[]>(`documents/news?pageSize=${limit || 12}`)
            .then(response => FireStoreParser(response.data).documents.map((d: any) => d.fields) as TNews[])
    },
}


