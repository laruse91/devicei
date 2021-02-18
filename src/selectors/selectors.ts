import { TGlobalState } from '../store/store'

//home
export const select = {
    carousel: (state: TGlobalState) => {
        return state.home.carousel
    },
    features: (state: TGlobalState) => {
        return state.home.features
    },
    saleGoods: (state: TGlobalState) => {
        return state.home.saleGoods
    },
    tabGoods: (state: TGlobalState) => {
        return state.home.tabGoods
    },
    news: (state: TGlobalState) => {
        return state.home.news
    },
    isLoading: (state: TGlobalState) => {
        return state.home.isLoading
    },
    goods: (state: TGlobalState) => {
        return state.shop.goods
    },
    categories: (state: TGlobalState) => {
        return state.shop.categories
    },
    product: (state: TGlobalState) => {
        return state.product.product
    },
}
type TSelector = typeof select
