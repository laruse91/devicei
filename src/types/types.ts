import { CSSProperties } from 'react'

export type TStyle = {
    [key: string]: CSSProperties
}
export type TNews = {
    article: string
    date: string
    id: string
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
export type TGroup = 'sale' | 'rate' | 'saleOfDay' | 'new' | 'profitable'
export type TProduct = {
    brand: string
    name: string
    description: string
    id: string
    image: string
    price: number
    oldPrice: number | null
    tags: [string, string]
    title: string
    category: string
    rate: number
    group: string | null
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
export type TTabs = 'rate' | 'new'
export type TSales = 'sale' | 'saleOfDay'
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
