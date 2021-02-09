import React from 'react'
import { Badge, Button, Card, Col, Image, Rate, Row, Typography } from 'antd'
import { TPrices } from '../../types/types'

const { Title } = Typography

type TProps = {
    id: number
    image: string
    price: TPrices
    title: string
}

export const SaleCard: React.FC<TProps> = React.memo(({ id, image, title, price }) => {
    const goodsImg = price.old ? (
        <Badge count='SALE!' offset={[-110, 30]} style={{ fontSize: '16px', background: '#3452ff' }}>
            <Image src='good' fallback={image} style={{ cursor: 'pointer' }} />
        </Badge>
    ) : (
        <Image src='good' fallback={image} style={{ cursor: 'pointer' }} />
    )

    return (
        <Col xs={8}>
            <Card
                size='small'
                hoverable
                style={{
                    border: `1px solid #dddddd`,
                    borderRadius: '10px',
                }}>
                <Row justify='space-between'>
                    <Col span={10}>{goodsImg}</Col>

                    <Col span={14} style={{ padding: `10px 0 0 10px` }}>
                        <Row>
                            <Rate style={{ fontSize: '14px' }} defaultValue={3} />
                        </Row>

                        <Row style={{ height: '70px' }}>
                            <Title style={{ cursor: 'pointer', marginTop: '5px' }} level={4}>
                                {title}
                            </Title>
                        </Row>

                        <Row align='middle'>
                            {price.old && (
                                <Col style={{ marginRight: `10px` }}>
                                    <Title type='secondary' delete level={5}>
                                        ${price.old}
                                    </Title>
                                </Col>
                            )}
                            <Col>
                                <Title style={{ color: `#3452ff` }} level={4}>
                                    ${price.current}
                                </Title>
                            </Col>
                        </Row>
                        <Row justify='end' style={{ margin: `10px 20px 0 0` }}>
                            <Button shape='round' size='small'>
                                TO CART
                            </Button>
                        </Row>
                    </Col>
                </Row>
            </Card>
        </Col>
    )
})
