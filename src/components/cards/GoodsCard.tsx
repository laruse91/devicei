import React from 'react'
import { Badge, Button, Card, Col, Image, Rate, Row, Space, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { TGoods, TPrices } from '../../types/types'

const { Title } = Typography

type TProps = {
    image: string
    title: string
    id: string
    tags: string[]
    price: TPrices
    size?: number
}

export const GoodsCard: React.FC<TProps> = React.memo(({ size = 6, id, image, title, price, tags }) => {
    const links = tags.map((t) => (
        <Space key={t} size={5}>
            <Link to={'#'}>{t}</Link>{' '}
        </Space>
    ))
    const goodsImg = price.old ? (
        <Badge count='SALE!' offset={[-110, 30]} style={{ fontSize: '16px', background: '#3452ff' }}>
            <Image src='good' fallback={image} style={{ maxHeight: '200px', cursor: 'pointer' }} />
        </Badge>
    ) : (
        <Image src='good' fallback={image} style={{ cursor: 'pointer' }} />
    )

    return (
        <Col xs={size}>
            <Card
                size='small'
                hoverable
                style={{
                    border: '1px solid #dddddd',
                    borderRadius: '10px',
                }}>
                <Col>
                    <Row>{goodsImg}</Row>
                    <Col>
                        <Row justify='center'>{links}</Row>

                        <Row style={{ height: '70px' }} justify='center'>
                            <Title style={{ cursor: 'pointer', marginTop: '5px' }} level={4}>
                                {title}
                            </Title>
                        </Row>

                        <Row justify='center' align='middle'>
                            <Space size={5}>
                                <Col>
                                    <Title style={{ color: '#3452ff' }} level={4}>
                                        ${price.current}{' '}
                                    </Title>
                                </Col>

                                {price.old && (
                                    <Col style={{ marginRight: '10px' }}>
                                        <Title type='secondary' delete level={5}>
                                            ${price.old}
                                        </Title>
                                    </Col>
                                )}
                            </Space>
                        </Row>

                        <Row justify='center'>
                            <Rate style={{ fontSize: '14px' }} defaultValue={3} />
                        </Row>

                        <Row justify='center' style={{ margin: '10px auto' }}>
                            <Button shape='round' size='small'>
                                TO CART
                            </Button>
                        </Row>
                    </Col>
                </Col>
            </Card>
        </Col>
    )
})
