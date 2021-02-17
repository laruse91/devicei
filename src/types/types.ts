export type TNews = {
    article: string
    date: string
    id: 321120
    image: string
    tag: string
    title: string
}
export type TReview = {
    id: string
    comment: string
    date: string
    userId: string
    userName: string
    userPhoto: string
    rate: number
}
export type TProduct = {
    brand: string
    description: string
    id: string
    image: string
    price: number
    oldPrice: number | null
    tags: string[]
    title: string
    category: string
    rate: number
    characteristics: {
        [key: string]: string
    }
    reviews: TReview[]
}
export type TCarousel = {
    title: string
    description: string
    image: string
}
export type superSaleOfDay = {
    bigCard: TProduct
    smallCard: TProduct
}
export type TTabs = 'recent' | 'rate' | 'sale'
export type TTabGoods = {
    [key in TTabs]: TProduct[]
}
export type TInfo = { brands: string[]; total: number; maximalPrice: number }
export type TCategories = string[]
export type TGoods = {
    items: TProduct[]
    total: number
    maximalPrice: number
    brands: string[]
}
export type TReviewForm = {
    rate: number
    comment: string
}
