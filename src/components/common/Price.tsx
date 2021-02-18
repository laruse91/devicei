import React from 'react'
import { Col, Row, Space, Typography } from 'antd'

const { Title } = Typography

type TProps = {
    price: number
    oldPrice: number | null
    size?: 3 | 4
    justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between'
}

export const Price: React.FC<TProps> = ({ price, oldPrice, size = 4, justify = 'center' }) => {
    return (
        <Row justify={justify} align='middle'>
            <Space size={10}>
                {oldPrice && (
                    <Col>
                        <Title type='secondary' delete level={(size + 1) as 5 | 4}>
                            ${oldPrice}
                        </Title>
                    </Col>
                )}

                <Col>
                    <Title style={{ color: '#3452ff' }} level={size}>
                        ${price}
                    </Title>
                </Col>
            </Space>
        </Row>
    )
}
