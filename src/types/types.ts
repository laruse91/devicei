import { CSSProperties } from 'react'

export type TStyle = {
    [key: string]: CSSProperties
}
export type TQueryParams = {
    page?: string
    priceFrom: string
    priceTo: string
    brand?: string
}
export type TNews = {
    articles: string[]
    date: string
    id: string
    image: string
    tag: string
    title: string
}
export type TReview = {
    id: number
    comment: string
    date: string
    userId: string
    userName: string
    userPhoto: string | null
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
}
export type TCarousel = {
    title: string
    description: string
    image: string
}
export type TTabs = 'rate' | 'new'
export type TSales = 'sale' | 'saleOfDay'
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
export type TAuthorizedUser = {
    name: string
    userId: string
    email: string
    photoURL: string | null
}
export type TContacts = {
    phoneNumber: string
    city: string
    street: string
    house: string
    flat: string
}
export type TCart = {
    id: string
    category: string
    quantity: number
    image: string | null
    name: string
    price: number
}
export type TUpdateData = {
    displayName?: string
    photoURL?: string
    phoneNumber?: string
}
export type TAboutSection = {
    id: string
    title: string
    desc: string
    image: string
}
export type TAboutNum = {
    count: number
    desc: string
    icon: string
}
export type TAbout = {
    main: TAboutSection
    sections: TAboutSection[]
    numbers: {
        'ship': TAboutNum
        'refund': TAboutNum
        'support': TAboutNum
        'delivery': TAboutNum
    }
}
export type TFaqGroups = 'Payment and Delivery' | 'Warranty and Service'
export type TFaqCategories = 'Electronic' | 'Computers' | 'Beauty & Health'
export type TFaq = { [group in TFaqGroups]: { [category in TFaqCategories]: string } }
export type THome = {
    carousel: TCarousel[]
    features: TProduct[]
}
export type TUserInfo = {
    cart: { [id: string]: number }
    contacts: TContacts
}
export type TGoodsInfo = {
    brands: string[]
    categories: string[]
    maximalPrice: number
    total: number
}

