import axios from 'axios'

export const instance = axios.create({
    baseURL: 'https://firestore.googleapis.com/v1/projects/devicei/databases/(default)/',

})
export const dbInstance = axios.create({
    baseURL: 'https://devicei-default-rtdb.firebaseio.com/',
})