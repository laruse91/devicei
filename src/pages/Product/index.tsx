import React, { useEffect } from 'react'
import { Section } from '../Home/Section'
import { Breadcrumb, Button, Col, Divider, Image, InputNumber, Rate, Row, Tabs, Typography } from 'antd'
import { s, sFont } from '../../styles/styles'
import { Link, useParams } from 'react-router-dom'
import { select } from '../../selectors/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../../store/product-reducer'
import { Comment } from '../../components/common/Comment'
import { CommentForm } from '../../components/common/CommentForm'
import { TReviewForm } from '../../types/types'

const { Title, Text } = Typography
const { TabPane } = Tabs

export const Product: React.FC = () => {
    const params: { id: string } = useParams()
    const product = useSelector(select.product)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProduct(params.id))
    }, [])

    const addReview = (value: TReviewForm) => {
        console.log(value)
    }

    const characteristics =
        product &&
        Object.keys(product.characteristics).map((ch) => {
            return (
                <Row key={ch}>
                    <Col xs={6}>
                        <Text>{ch}: </Text>
                    </Col>
                    <Col xs={18}>
                        <Text>{product?.characteristics[ch]}</Text>
                    </Col>
                    <Divider style={{ margin: '5px' }} />
                </Row>
            )
        })

    const reviews = !product?.reviews.length ? (
        <Text>There are no any review of {product?.title} yet</Text>
    ) : (
        product.reviews.map((r) => {
            return (
                <Comment
                    key={r.id}
                    userName={r.userName}
                    userPhoto={r.userPhoto}
                    date={r.date}
                    commentBody={r.comment}
                    rate={r.rate}
                />
            )
        })
    )

    const category = product && product.category[0].toUpperCase() + product.category.slice(1)

    return (
        <>
            <Section bgColor='white' verticalPadding={10}>
                <Breadcrumb style={s.breadCrumb}>
                    <Breadcrumb.Item>
                        <Link to={'/home'}>Home</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to={'/shop'}>Shop</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>{category}</Breadcrumb.Item>
                </Breadcrumb>
            </Section>

            <Section bgColor='white'>
                <Col xs={12}>
                    <Image preview={false} style={s.productImage} src={product?.image} />
                </Col>
                <Col xs={12}>
                    <Title level={2}>{product?.title}</Title>
                    <Rate disabled value={product?.rate} style={sFont(16)} />

                    <Row align='middle' style={{ margin: '20px 0' }}>
                        {product?.oldPrice && (
                            <Col style={{ marginRight: '10px' }}>
                                <Text type='secondary' delete>
                                    ${product?.oldPrice}
                                </Text>
                            </Col>
                        )}

                        <Title level={3} style={{ color: '#3452ff' }}>
                            ${product?.price}
                        </Title>
                    </Row>
                    <Text>{product?.description}</Text>
                    <Row style={{ margin: '20px 0' }}>
                        <InputNumber
                            min={1}
                            max={10}
                            defaultValue={1}
                            style={{ marginRight: '20px', borderRadius: '10px' }}
                        />
                        <Button shape='round'>ADD TO CART</Button>
                    </Row>
                    <Row align='middle'>
                        <Title style={{ margin: 0 }} level={5}>
                            Categories:
                        </Title>
                        <Link style={{ margin: '0 5px 0 20px' }} to={`/shop/${product?.tags[0]}`}>
                            {product?.tags[0]},
                        </Link>
                        <Link to={`/shop/${product?.tags[0]}?brand=${product?.tags[1]}`}>{product?.tags[1]}</Link>
                    </Row>
                </Col>
            </Section>

            <Section verticalPadding={20} bgColor='white' justify='center'>
                <Tabs defaultActiveKey='characteristics' style={{ width: '100%' }}>
                    <TabPane tab='Characteristics' key='characteristics'>
                        <Col>{characteristics}</Col>
                    </TabPane>
                    <TabPane tab='Reviews' key='reviews'>
                        <Row>
                            <Col xs={14}>{reviews}</Col>
                            <Col xs={10}>
                                <CommentForm handleSubmit={addReview} formTitle='Add a review' />
                            </Col>
                        </Row>
                    </TabPane>
                </Tabs>
            </Section>
        </>
    )
}
