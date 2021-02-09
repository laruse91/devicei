import React from 'react'
import { Col, Typography } from 'antd'
import { TPrices } from '../../types/types'

const { Title, Text } = Typography

type TProps = {
    brand: string
    id: number
    image: string
    price: TPrices
    title: string
}
export const FeatureCard: React.FC<TProps> = React.memo(({ id, image, title, price, brand }) => {
    return (
        <Col
            xs={11}
            style={{
                background: `url(${image})`,
                borderRadius: '10px',
                padding: '30px 150px 30px 40px',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
            <Title style={{ margin: 0, color: 'white' }} level={3}>
                {title}
            </Title>
            <Title style={{ margin: '0 0 20px', color: 'white', cursor: 'pointer' }} level={2}>
                {brand}
            </Title>
            <Text style={{ color: 'white' }}>Starting at</Text>
            <Title style={{ margin: 0, color: '#f9db76' }} level={1}>
                ${price.current}
            </Title>
        </Col>
    )
})
