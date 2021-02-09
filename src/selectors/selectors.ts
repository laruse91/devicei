import { TGlobalState } from '../store/store'

//home
export const select = {
    carousel: (state: TGlobalState) => {
        return state.home.carousel
    },
    features: (state: TGlobalState) => {
        return state.home.features
    },
    sale: (state: TGlobalState) => {
        return state.home.sale
    },
    bigSale: (state: TGlobalState) => {
        return state.home.bigSale
    },
    news: (state: TGlobalState) => {
        return state.home.news
    },
    categories: (state: TGlobalState) => {
        return state.home.categories
    },
}
type TSelector = typeof select
