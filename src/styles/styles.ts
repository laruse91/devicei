import { CSSProperties } from 'react'

type TStyle = {
    [key: string]: CSSProperties
}

export const s: TStyle = {
    header: {
        padding: '20px',
        position: 'sticky',
        top: '0',
        zIndex: 100,
        width: '100%',
        background: 'white',
        boxShadow: `0 5px 20px -6px #c6c6c6`,
    },
    footer: { background: '#212121', padding: `40px 0` },
    footIcon: { fontSize: '22px', color: '#727272', cursor: 'pointer' },
    footText: { fontSize: '18px', color: '#727272' },
}

export const sFont: (fontSize: number) => CSSProperties = (fontSize) => ({
    fontSize: `${fontSize}px`,
})
