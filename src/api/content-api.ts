import { instance } from './api'
import { TAbout, TFaq, THome } from '../types/types'
// @ts-ignore
import FireStoreParser from 'firestore-parser'

export const contentApi = {
    requestContent(page: 'about' | 'home' | 'faq') {
        return instance
            .get(`documents/pages/${page}`)
            .then<Promise<TAbout | TFaq | THome >>(response => FireStoreParser(response.data).fields)
    },
}
