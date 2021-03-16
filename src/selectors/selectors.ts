import { TGlobalState } from '../store/store'

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
    popularNews: (state: TGlobalState) => {
        return state.home.popularNews
    },
    isLoading: (state: TGlobalState) => {
        return state.home.isLoading
    },


    goods: (state: TGlobalState) => {
        return state.shop.goods
    },
    product: (state: TGlobalState) => {
        return state.shop.product
    },
    reviews: (state: TGlobalState) => {
        return state.shop.reviews
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


    cartGoods: (state: TGlobalState) => {
        return state.cart.cart
    },


    article: (state: TGlobalState) => {
        return state.news.article
    },
    News: (state: TGlobalState) => {
        return state.news.news
    },


    about: (state: TGlobalState) => {
        return state.content.about
    },
    faq: (state: TGlobalState) => {
        return state.content.faq
    },
}
