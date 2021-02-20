import React, { CSSProperties, memo } from 'react'
import { Col, Row, Typography } from 'antd'
import { TProduct } from '../../types/types'
import { s } from '../../styles/styles'

const { Title, Text } = Typography

type TProps = {
    product: TProduct
    size?: number
    type?: 'vertical' | 'horizontal'
}
export const FeatureCard: React.FC<TProps> = memo(({ product, size = 12, type = 'horizontal' }) => {
    const sCard: CSSProperties = {
        background: `url(${product.image})`,
        borderRadius: '10px',
        padding: '30px 15px 30px 20px',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100%',
    }

    const price = product.oldPrice ? (
        <Text type='secondary' delete style={{ color: 'white', fontSize: '16px' }}>
            ${product.oldPrice}
        </Text>
    ) : (
        <Text style={{ color: 'white' }}>Starting at</Text>
    )
    let xs = 24
    let sm = 12
    let md = 8

    if (type === 'horizontal') {
        sCard.padding = '30px 120px 30px 40px'
        xs = 24
        sm = 24
        md = size
    }

    return (
        <Col xs={xs} sm={sm} md={md} lg={size}>
            <Row style={sCard}>
                <Col>
                    <Title style={{ margin: 0, color: 'white' }} level={3}>
                        {product.title}
                    </Title>
                    <Title style={s.futureProductName} level={2} ellipsis={{ rows: 2 }}>
                        {product.name}
                    </Title>
                    {price}
                    <Title style={{ marginTop: 'auto', color: '#f9db76' }} level={1}>
                        ${product.price}
                    </Title>
                </Col>
            </Row>
        </Col>
    )
})
