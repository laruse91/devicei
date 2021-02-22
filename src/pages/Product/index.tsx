import React, { useEffect } from 'react'
import { Section } from '../../components/common/Section'
import { Breadcrumb, Button, Col, Divider, Image, InputNumber, Rate, Row, Tabs, Typography } from 'antd'
import { s, sFont } from '../../styles/styles'
import { Link, useParams } from 'react-router-dom'
import { select } from '../../selectors/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../../store/product-reducer'
import { Comment } from '../../components/common/Comment'
import { CommentForm } from '../../components/common/CommentForm'
import { TReviewForm } from '../../types/types'
import { TagLinks } from '../../components/common/TagLinks'
import { Price } from '../../components/common/Price'
import { BreadCrumbs } from '../../components/common/BreadCrumbs'

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

    if (!product) return <div>loading</div>
    return (
        <>
            <BreadCrumbs routes={['shop', product.category]} />

            <Section bgColor='white' verticalPadding={20}>
                <Col xs={20} sm={10} md={12} lg={12}>
                    <Image preview={false} style={s.productImage} src={product.image} />
                </Col>

                <Col xs={24} sm={14} md={12} lg={12}>
                    <Title level={2}>{product.name}</Title>
                    <Rate disabled value={product.rate} style={sFont(16)} />

                    <Price price={product.price} oldPrice={product.oldPrice} size={3} justify='start' />

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
                        <Title style={{ margin: '0 20px 0 0' }} level={5}>
                            Categories:
                        </Title>
                        <TagLinks tags={product.tags} />
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
                            <Col xs={24} sm={14} md={14}>
                                {reviews}
                            </Col>
                            <Col xs={24} sm={10} md={10}>
                                <CommentForm handleSubmit={addReview} formTitle='Add a review' />
                            </Col>
                        </Row>
                    </TabPane>
                </Tabs>
            </Section>
        </>
    )
}
