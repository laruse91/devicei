import React, { memo } from 'react'
import { Badge, Button, Card, Col, Grid, Image, Rate, Row, Typography } from 'antd'
import { useHistory } from 'react-router-dom'
import { TProduct } from '../../types/types'
import { s, sFont } from '../../styles/styles'
import { TagLinks } from '../common/TagLinks'
import { Price } from '../common/Price'

const { Title, Paragraph } = Typography
const { useBreakpoint } = Grid

type TResponsive = {
    xs: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
    xxl?: number
}

type TProps = {
    product: TProduct
    type?: 'vertical' | 'horizontal'
    hover?: boolean
    desc?: boolean
    responsive?: TResponsive
}

export const ProductCard: React.FC<TProps> = memo(
    ({ product, responsive = { xs: 12, sm: 12, md: 8, lg: 6 }, type = 'vertical', hover = true, desc = false }) => {
        const screen = useBreakpoint()
        const history = useHistory()

        const handleCardClick = () => {
            history.replace({ pathname: `/product/${product.id}` })
        }

        const tag = product.group
        const badge = tag === 'sale' || tag === 'new' ? tag[0].toUpperCase() + tag.slice(1) : 0

        const description = desc && <Paragraph ellipsis={{ rows: 5 }}>{product.description}</Paragraph>

        if (type === 'vertical')
            return (
                <Col
                    xs={responsive.xs}
                    sm={responsive.sm}
                    md={responsive.md}
                    lg={responsive.lg}
                    xl={responsive.xl}
                    xxl={responsive.xxl}>
                    <Badge count={badge} style={s.badge} offset={[-50, 30]}>
                        <Card size='small' hoverable={hover} style={s.productCard}>
                            <Row justify='center'>
                                <Col style={{ margin: '0 auto' }} span={22}>
                                    <Row justify='center' style={{ cursor: 'pointer' }} onClick={handleCardClick}>
                                        <Image
                                            src='product'
                                            width='100%'
                                            height={200}
                                            fallback={product.image}
                                            style={{ borderRadius: '10px', objectFit: 'cover' }}
                                        />
                                    </Row>

                                    <TagLinks tags={product.tags} />

                                    <Row justify='center' onClick={handleCardClick}>
                                        <Title style={s.productName} level={screen.sm ? 4 : 5} ellipsis={{ rows: 2 }}>
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
            <Col
                xs={responsive.xs}
                sm={responsive.sm}
                md={responsive.md}
                lg={responsive.lg}
                xl={responsive.xl}
                xxl={responsive.xxl}>
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
                                <Title style={s.productName} level={screen.md ? 4 : 5} ellipsis={{ rows: 2 }}>
                                    {product.name}
                                </Title>
                            </Row>

                            <Price oldPrice={product.oldPrice} price={product.price} />

                            <Row justify='center' style={{ margin: '10px 0' }}>
                                <Button shape='round' size='small'>
                                    TO CART
                                </Button>
                            </Row>

                            {screen.lg && description}
                        </Col>
                    </Row>

                    {!screen.lg && description}
                </Card>
            </Col>
        )
    }
)
