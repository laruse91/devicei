// get random number
import { TProduct } from '../types/types'

export const random = (min: number, max: number): number => {
    // случайное число от min до (max+1)
    const rand = min + Math.random() * (max + 1 - min)
    return Math.floor(rand)
}

//create new arr with x=num elements
export const fillArray = (num: number) => {
    let arr = []
    for (let i = 0; i < num; i++) {
        arr.push(i)
    }
    return arr
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
