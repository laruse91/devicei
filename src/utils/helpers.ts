// get random number
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
