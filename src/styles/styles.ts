import { CSSProperties } from 'react'
import { TStyle } from '../types/types'

export const s: TStyle = {
    footIcon: { fontSize: '22px', color: '#727272', cursor: 'pointer' },
    footText: { fontSize: '18px', color: '#727272' },
    breadCrumb: { marginTop: '20px', fontSize: '14px' },
    productImage: { borderRadius: '10px', border: '1px solid #dddddd', width: '90%' },
    productCard: { border: '1px solid #dddddd', borderRadius: '10px', cursor: 'default' },
    productName: { marginTop: '5px', height: '55px', cursor: 'pointer', textAlign: 'center' },
    futureProductName: { color: 'white', marginTop: '5px', height: '90px', cursor: 'pointer' },
    badge: { fontSize: '16px', background: '#3452ff' },
}
export const sAuthForm = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
}

export const sFont: (fontSize: number) => CSSProperties = (fontSize) => ({
    fontSize: `${fontSize}px`,
})
