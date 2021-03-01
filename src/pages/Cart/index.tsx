import React from 'react'
import { BreadCrumbs } from '../../components/common/BreadCrumbs'
import { Section } from '../../components/common/Section'
import { Button, Col, Divider, Row, Typography } from 'antd'
import { GoodsTable } from './GoodsTable'
import { useSelector } from 'react-redux'
import { select } from '../../selectors/selectors'
import { s } from '../../styles/styles'
import { Link } from 'react-router-dom'

const { Title, Text } = Typography

export const Cart: React.FC = () => {
    const cartGoods = useSelector(select.cartGoods)
    const totalItems: number = cartGoods.reduce((sum, product) => {
        return sum + product.quantity
    }, 0)
    const totalPrice: number = cartGoods.reduce((sum, product) => {
        return sum + product.quantity * product.price
    }, 0)

    return (
        <>
            <BreadCrumbs routes={['cart', undefined]} />

            <Section justify='start' bgColor='white'>
                <Title style={{ margin: '0' }}>My Cart</Title>
                <Divider />
            </Section>
            <Section bgColor='white'>
                <GoodsTable />
            </Section>
            <Section justify='start' bgColor='white' title='Cart totals' verticalPadding={20}>
                <Col xs={24} md={12}>
                    <Col span={24} style={s.totals}>
                        <Row justify='space-between' align='middle' style={{ padding: '20px 20px' }}>
                            <Title level={5} style={{ margin: 0 }}>
                                Total items:
                            </Title>
                            <Text style={{ fontSize: '16px' }}>{totalItems}</Text>
                        </Row>
                        <Divider style={{ margin: 0 }} />
                        <Row justify='space-between' align='middle' style={{ padding: '20px 20px' }}>
                            <Title level={5} style={{ margin: 0 }}>
                                Total price:
                            </Title>
                            <Text style={{ fontSize: '16px' }}>${totalPrice}</Text>
                        </Row>
                    </Col>

                    <Row justify='end' style={{ marginTop: '20px' }}>
                        <div>
                            <Link to={'#'}>
                                <Button disabled={!cartGoods.length} shape='round' type='primary' size='large'>
                                    PROCEED TO CHECKOUT
                                </Button>
                            </Link>
                        </div>
                    </Row>
                </Col>
            </Section>
        </>
    )
}
