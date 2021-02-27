import React, { useEffect } from 'react'
import { Badge, Col, Empty, Popover, Row, Typography } from 'antd'
import { Link } from 'react-router-dom'
import Icon from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { select } from '../../selectors/selectors'
import { getUserCart } from '../../store/cart-reducer'
import { ReactComponent as ShoppingCart } from '../../assets/shopping-cart.svg'
import { CartPreview } from './CartPreview'

const { Title, Paragraph } = Typography

export const Cart: React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserCart())
    }, [])

    const cartGoods = useSelector(select.cartGoods)

    const totalItems: number = cartGoods.reduce((sum, product) => {
        return sum + product.quantity
    }, 0)
    const totalPrice: number = cartGoods.reduce((sum, product) => {
        return sum + product.price * product.quantity
    }, 0)

    const content = !cartGoods.length ? (
        <div style={{ margin: '30px auto' }}>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span> Your Cart is empty yet</span>} />
        </div>
    ) : (
        <Col>
            {cartGoods.map((g) => {
                return (
                    <CartPreview
                        key={g.id}
                        image={g.image}
                        quantity={g.quantity}
                        id={g.id}
                        price={g.price}
                        name={g.name}
                    />
                )
            })}
        </Col>
    )

    return (
        <Row gutter={20} justify='center' align='middle'>
            <Col>
                <Popover placement='bottom' content={content} title='Your Cart'>
                    <Link to={'/cart'}>
                        <Badge count={totalItems} style={{ backgroundColor: '#3452ff' }}>
                            <Icon component={ShoppingCart} style={{ fontSize: '35px', color: '#2e2e2e' }} />
                        </Badge>
                    </Link>
                </Popover>
            </Col>

            <Col style={{ minWidth: '70px' }}>
                <Paragraph style={{ margin: 0, color: '#2e2e2e', fontSize: '12px' }}>Your cart</Paragraph>
                <Title style={{ margin: 0, color: '#2e2e2e' }} level={5}>
                    ${totalPrice}
                </Title>
            </Col>
        </Row>
    )
}
