// get random number
import { TProduct } from '../types/types'

export const random = (min: number, max: number): number => {
    // случайное число от min до (max+1)
    const rand = min + Math.random() * (max + 1 - min)
    return Math.floor(rand)
}

//fill array by random el from other array
export const fillArray = (arr: any[], count: number) => {
    let newArr = arr.slice()
    let resArr = []

    for (let i = 1; i <= count; i++) {
        const r = random(0, newArr.length - 1)
        resArr.push(newArr[r])
        newArr.splice(r, 1)
    }
    return resArr
}

//take a part of el in array (for pagination)
export const part = (page: number, limit: number, array: any[]): any[] => {
    return array.slice((page - 1) * limit, (page - 1) * limit + limit)
}
//get miPrice and maxPrice
export const minMax = (array: TProduct[]): [number, number] => {
    let max = 0
    let min = Infinity
    for (let i in array) {
        if (array[i].price > max) {
            max = array[i].price
        }
        if (array[i].price < min) {
            min = array[i].price
        }
    }
    return [min, max]
}
