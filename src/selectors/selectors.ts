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
    isFetching: (state: TGlobalState) => {
        return state.shop.isFetching
    },
    categories: (state: TGlobalState) => {
        return state.app.categories
    },
    isAuth: (state: TGlobalState) => {
        return state.auth.isAuth
    },
    authorizedUser: (state: TGlobalState) => {
        return state.auth.authorizedUser
    },
    contacts: (state: TGlobalState) => {
        return state.auth.contacts
    },
    product: (state: TGlobalState) => {
        return state.product.product
    },
    cartGoods: (state: TGlobalState) => {
        return state.cart.cart
    },
    about: (state: TGlobalState) => {
        return state.content.about
    },
    article: (state: TGlobalState) => {
        return state.news.article
    },
    Nnews: (state: TGlobalState) => {
        return state.news.news
    },
}
type TSelector = typeof select
