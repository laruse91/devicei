import React, { memo } from 'react'
import { Badge, Card, Col, Grid, Image, Rate, Row, Typography } from 'antd'
import { useHistory } from 'react-router-dom'
import { TProduct } from '../../types/types'
import { s, sFont } from '../../styles/styles'
import { TagLinks } from '../common/TagLinks'
import { Price } from '../common/Price'
import { AddToCartButton } from '../common/AddToCartButton'
import { errorImg } from '../../utils/helpers'

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
            history.replace({ pathname: `/shop/${product.category}/${product.id}` })
        }

        const tag = product.group
        const badge = tag === 'sale' || tag === 'new' ? tag[0].toUpperCase() + tag.slice(1) : 0
        const sImage = (url: string, height?: number) => ({
            backgroundImage: `url(${url || errorImg})`,
            borderRadius: '10px',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            marginRight: '5px',
            height: height ? `${height}px` : '100%',
            width: '100%',
            cursor: 'pointer',
        })

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
                    <Card size='small' hoverable={hover} style={s.productCard}>
                        <Row justify='center' style={{ width: '100%' }}>
                            <Col style={{ margin: '0 auto' }} span={22}>
                                <Row justify='end' onClick={handleCardClick} style={sImage(product.image, 200)}>
                                    <Badge count={badge} style={s.badge} />
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
                                    <AddToCartButton
                                        name={product.name}
                                        price={product.price}
                                        image={product.image}
                                        id={product.id}
                                        category={product.category}
                                    />
                                </Row>
                            </Col>
                        </Row>
                    </Card>
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
                            <Row justify='end' onClick={handleCardClick} style={sImage(product.image)}>
                                <Badge count={badge} style={s.badge} />
                            </Row>
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
                                <AddToCartButton
                                    name={product.name}
                                    price={product.price}
                                    image={product.image}
                                    id={product.id}
                                    category={product.category}
                                />
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
