import React from 'react'
import { Col, Typography } from 'antd'

const { Title, Text } = Typography

type TProps = {
    image: string
    title: string
    id: string
    name: string
    price: number
    oldPrice: number | null
}

export const SmallCard: React.FC<TProps> = React.memo(({ id, image, title, price, oldPrice, name }) => {
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
                {title}
            </Title>
            <Title style={{ margin: '0 0 20px', color: 'white', cursor: 'pointer' }} level={2}>
                {name}
            </Title>
            <Text type='secondary' delete style={{ color: 'white' }}>
                ${oldPrice}
            </Text>
            <Title style={{ margin: 0, color: '#f9db76' }} level={1}>
                ${price}
            </Title>
        </Col>
    )
})
