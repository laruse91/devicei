import React from 'react'
import { Col, Row, Typography } from 'antd'

const { Title, Text } = Typography

type TProps = {
    image: string
    title: string
    id: number
    text: string
    price: {
        old: number | null
        current: number
    }
}

export const SmallCard: React.FC<TProps> = React.memo(({ id, image, title, price, text }) => {
    return (
        <Col
            xs={5}
            style={{
                background: `url(${image})`,
                borderRadius: '10px',
                padding: '30px 30px 30px 40px',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
            <Title style={{ margin: 0, color: 'white' }} level={3}>
                {text}
            </Title>
            <Title style={{ margin: `0 0 20px`, color: 'white', cursor: 'pointer' }} level={2}>
                {title}
            </Title>
            <Text type='secondary' delete style={{ color: 'white' }}>
                ${price.old}
            </Text>
            <Title style={{ margin: 0, color: '#f9db76' }} level={1}>
                ${price.current}
            </Title>
        </Col>
    )
})
