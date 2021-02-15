import React from 'react'
import { Badge, Card, Col, Image, Rate, Row, Typography } from 'antd'

const { Title, Paragraph } = Typography

type TProps = {
    image: string
    title: string
    id: string
    description: string
    price: number
    oldPrice: number | null
}

export const BigCard: React.FC<TProps> = React.memo(({ id, image, title, price, oldPrice, description }) => {
    const goodsImg = oldPrice ? (
        <Badge count='SALE!' offset={[-110, 30]} style={{ fontSize: '16px', background: '#3452ff' }}>
            <Image src='good' fallback={image} style={{ cursor: 'pointer' }} />
        </Badge>
    ) : (
        <Image src='good' fallback={image} style={{ cursor: 'pointer' }} />
    )

    return (
        <Col xs={18}>
            <Card
                size='small'
                hoverable
                style={{
                    border: '1px solid #dddddd',
                    borderRadius: '10px',
                }}>
                <Row justify='space-between'>
                    <Col span={10}>{goodsImg}</Col>

                    <Col span={14} style={{ padding: '10px 0 0 10px' }}>
                        <Row>
                            <Rate style={{ fontSize: '14px' }} defaultValue={3} />
                        </Row>

                        <Row style={{ height: '70px' }}>
                            <Title style={{ cursor: 'pointer', marginTop: '5px' }} level={4}>
                                {title}
                            </Title>
                        </Row>

                        <Row align='middle'>
                            {oldPrice && (
                                <Col style={{ marginRight: '10px' }}>
                                    <Title type='secondary' delete level={5}>
                                        ${oldPrice}
                                    </Title>
                                </Col>
                            )}
                            <Col>
                                <Title style={{ color: '#3452ff' }} level={4}>
                                    ${price}
                                </Title>
                            </Col>
                        </Row>
                        <Row>
                            <Paragraph>{description}</Paragraph>
                        </Row>
                    </Col>
                </Row>
            </Card>
        </Col>
    )
})
