import React, { useEffect } from 'react'
import { Badge, Col } from 'antd'
import { Link } from 'react-router-dom'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { sFont } from '../../styles/styles'
import { useDispatch, useSelector } from 'react-redux'
import { select } from '../../selectors/selectors'
import { getUserCart } from '../../store/cart-reducer'

export const Cart: React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserCart())
    }, [])

    const cartGoods = useSelector(select.cartGoods)

    const total: number = cartGoods.reduce((sum, product) => {
        return sum + product.quantity
    }, 0)

    return (
        <Col xs={6} style={{ cursor: 'pointer' }}>
            <Badge count={total}>
                <Link to={'/cart'}>
                    <ShoppingCartOutlined style={sFont(25)} />
                </Link>
            </Badge>
        </Col>
    )
}
