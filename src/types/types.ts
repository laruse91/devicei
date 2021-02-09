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
export type TGood = {
    brand: string
    description: string
    id: number
    image: string
    price: TPrices
    tags: string[]
    title: string
}
export type TCarousel = {
    title: string
    description: string
    image: string
}
