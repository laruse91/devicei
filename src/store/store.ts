import db from '../db.json'

export const phones = Object.values(db.goods.phone)
export const sale = randomGoods(3, phones)
export const categories = randomGoods(4, phones)

export const feature = Object.values(db.feature)
export const news = Object.values(db.news).splice(1, 3)
export const bigSale = Object.values(db.bigSale)[0]

export function randomGoods(num: number, arr: any[]) {
    let spread = [...arr]
    let newArr: any[] = []
    for (let i = 0; i < num; i++) {
        let r = Math.floor(Math.random() * (spread.length - 1))
        spread.splice(r, 1)
        newArr.push(spread[r])
    }
    return newArr
}
