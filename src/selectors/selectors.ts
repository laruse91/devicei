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
    superSaleOfDay: (state: TGlobalState) => {
        return state.home.superSaleOfDay
    },
    news: (state: TGlobalState) => {
        return state.home.news
    },
    tabGoods: (state: TGlobalState) => {
        return state.home.tabGoods
    },
    goods: (state: TGlobalState) => {
        return state.shop.goods
    },
    total: (state: TGlobalState) => {
        return state.shop.total
    },
}
type TSelector = typeof select
