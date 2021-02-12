export type TPrices = {
    current: number
    old: number | null
}
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
    price: TPrices
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
export type TTabGoods = { [key: string]: TGoods[] }
