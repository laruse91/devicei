import React from 'react'
import { Badge, Button, Card, Col, Image, Rate, Row, Space, Typography } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import { TProduct } from '../../types/types'
const { Title } = Typography

type TProps = {
    goods: TProduct
    size?: number
}

export const ProductCard: React.FC<TProps> = React.memo(({ goods, size = 6 }) => {
    const links = goods.tags.map((t) => (
        <Space key={t} size={5}>
            <Link to={'#'}>{t}</Link>{' '}
        </Space>
    ))
    const goodsImg = goods.oldPrice ? (
        <Badge count='SALE!' offset={[-110, 30]} style={{ fontSize: '16px', background: '#3452ff' }}>
            <Image src='good' fallback={goods.image} style={{ maxHeight: '200px', cursor: 'pointer' }} />
        </Badge>
    ) : (
        <Image src='good' fallback={goods.image} style={{ cursor: 'pointer' }} />
    )
    const history = useHistory()
    const handleCardClick = () => {
        history.replace({ pathname: `/product/${goods.id}` })
    }

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
                    <Row onClick={handleCardClick}>{goodsImg}</Row>
                    <Col>
                        <Row justify='center'>{links}</Row>

                        <Row style={{ height: '70px' }} justify='center' onClick={handleCardClick}>
                            <Title style={{ cursor: 'pointer', marginTop: '5px' }} level={4}>
                                {goods.title}
                            </Title>
                        </Row>

                        <Row justify='center' align='middle'>
                            <Space size={5}>
                                <Col>
                                    <Title style={{ color: '#3452ff' }} level={4}>
                                        ${goods.price}{' '}
                                    </Title>
                                </Col>

                                {goods.oldPrice && (
                                    <Col style={{ marginRight: '10px' }}>
                                        <Title type='secondary' delete level={5}>
                                            ${goods.oldPrice}
                                        </Title>
                                    </Col>
                                )}
                            </Space>
                        </Row>

                        <Row justify='center'>
                            <Rate style={{ fontSize: '14px' }} defaultValue={goods.rate} />
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
