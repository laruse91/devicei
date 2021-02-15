export type TNews = {
    article: string
    date: string
    id: 321120
    image: string
    tag: string
    title: string
}
export type TGoods = {
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
}
export type TCarousel = {
    title: string
    description: string
    image: string
}
export type superSaleOfDay = {
    bigCard: TGoods
    smallCard: TGoods
}
export type TTabs = 'recent' | 'rate' | 'sale'
export type TTabGoods = {
    [key in TTabs]: TGoods[]
}
export type TInfo = { brands: string[]; total: number; maximalPrice: number }
export type TCategories = string[]
export type TProduct = {
    items: TGoods[]
    total: number
    maximalPrice: number
    brands: string[]
}
