import { CSSProperties } from 'react'
import { TStyle } from '../types/types'

export const s: TStyle = {
    footIcon: { fontSize: '22px', color: '#727272', cursor: 'pointer' },
    footText: { fontSize: '18px', color: '#727272' },
    breadCrumb: { marginTop: '20px', fontSize: '14px' },
    productImage: { borderRadius: '10px', border: '1px solid #dddddd', width: '90%' },
    productCard: { border: '1px solid #dddddd', borderRadius: '10px', cursor: 'default', width: '100%' },
    productName: { marginTop: '5px', height: '55px', cursor: 'pointer', textAlign: 'center' },
    imageWrapper: {borderRadius: '20px', background: '#f2f2f2', height: '100%', padding: '80px 0'},
    futureProductName: { color: 'white', marginTop: '5px', height: '90px' },
    badge: { fontSize: '16px', background: '#3452ff' },
    table: {
        border: '1px solid #dddddd',
        borderBottomLeftRadius: '10px',
        borderBottomRightRadius: '10px',
        maxHeight: '40vh',
        overflow: 'auto',
    },
    tableHeader: {
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
        background: '#3452ff',
    },
    tableTitle: { textAlign: 'center', color: 'white', margin: 0 },
    totals: {
        border: '1px solid #dddddd',
        borderRadius: '10px',
    },
    tags:{display: 'block', width: '100%', color: '#1890ff'},
    logoBadge: { position: 'absolute', left: '99px', top: '-4px' },
    logoStick: {
        marginLeft: '1px',
        width: '3px',
        height: '17px',
        backgroundColor: 'black',
    },
    nothingFound: { width: '100%', margin: '40px auto' }
}
export const sAuthForm = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
}

export const sFont: (fontSize: number) => CSSProperties = (fontSize) => ({
    fontSize: `${fontSize}px`,
})
