import React, { memo } from 'react'
import { Badge, Button, Card, Col, Image, Rate, Row, Typography } from 'antd'
import { useHistory } from 'react-router-dom'
import { TProduct } from '../../types/types'
import { s, sFont } from '../../styles/styles'
import { TagLinks } from '../common/TagLinks'
import { Price } from '../common/Price'

const { Title, Paragraph } = Typography

type TProps = {
    product: TProduct
    size?: number
    type?: 'vertical' | 'horizontal'
    hover?: boolean
    desc?: boolean
}

export const ProductCard: React.FC<TProps> = memo(
    ({ product, size = 6, type = 'vertical', hover = true, desc = false }) => {
        const history = useHistory()
        const handleCardClick = () => {
            history.replace({ pathname: `/product/${product.id}` })
        }
        const tag = product.group
        const badge = tag === 'sale' || tag === 'new' ? tag[0].toUpperCase() + tag.slice(1) : 0

        if (type === 'vertical')
            return (
                <Col xs={24 / (24 / size - 2)} md={24 / (24 / size - 1)} lg={size}>
                    <Badge count={badge} style={s.badge} offset={[-50, 30]}>
                        <Card size='small' hoverable={hover} style={s.productCard}>
                            <Row justify='center'>
                                <Col style={{ margin: '0 auto' }} xs={22} sm={16} md={18}>
                                    <Row justify='center' style={{ cursor: 'pointer' }} onClick={handleCardClick}>
                                        <Image src='product' width={'100%'} fallback={product.image} />
                                    </Row>

                                    <TagLinks tags={product.tags} />

                                    <Row justify='center' onClick={handleCardClick}>
                                        <Title style={s.productName} level={4} ellipsis={{ rows: 2 }}>
                                            {product.name}
                                        </Title>
                                    </Row>

                                    <Price oldPrice={product.oldPrice} price={product.price} />

                                    <Row justify='center'>
                                        <Rate style={sFont(14)} disabled value={product.rate} />
                                    </Row>

                                    <Row justify='center' style={{ marginTop: '10px' }}>
                                        <Button shape='round' size='small'>
                                            TO CART
                                        </Button>
                                    </Row>
                                </Col>
                            </Row>
                        </Card>
                    </Badge>
                </Col>
            )

        return (
            <Col xs={24} sm={12} md={12} lg={size}>
                <Card size='small' style={s.productCard} hoverable={hover}>
                    <Row justify='space-between'>
                        <Col xs={10} sm={12} style={{ cursor: 'pointer' }} onClick={handleCardClick}>
                            <Badge count={badge} style={s.badge} offset={[-20, 20]}>
                                <Image src='product' width={'100%'} fallback={product.image} />
                            </Badge>
                        </Col>

                        <Col xs={14} sm={12} style={{ paddingTop: '10px' }}>
                            <Row justify='center'>
                                <Rate style={sFont(14)} disabled value={product.rate} />
                            </Row>

                            <Row justify='center' onClick={handleCardClick}>
                                <Title style={s.productName} level={5} ellipsis={{ rows: 2 }}>
                                    {product.name}
                                </Title>
                            </Row>

                            <Price oldPrice={product.oldPrice} price={product.price} />

                            <Row justify='center' style={{ marginTop: '10px' }}>
                                <Button shape='round' size='small'>
                                    TO CART
                                </Button>
                            </Row>

                            {desc && <Paragraph>{product.description}</Paragraph>}
                        </Col>
                    </Row>
                </Card>
            </Col>
        )
    }
)
