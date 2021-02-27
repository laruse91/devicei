import React from 'react'
import { Col, Divider, Row, Typography } from 'antd'
import cl from '../../pages/Cart/GoodsTable.module.css'
import { CloseOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { TCart } from '../../types/types'
import { removeProduct } from '../../store/cart-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { select } from '../../selectors/selectors'

const { Paragraph } = Typography

export const CartPreview: React.FC<TCart> = React.memo(({ id, name, image, quantity, price }) => {
    const authorizedUser = useSelector(select.authorizedUser)
    const dispatch = useDispatch()

    const handleDelete = (id: string) => () => {
        dispatch(removeProduct(authorizedUser?.userId, id))
    }
    return (
        <div key={id}>
            <Row className={cl.preview}>
                <Col span={6}>
                    <Row justify='center' align='middle' style={{ height: '100%' }}>
                        <Link to={`/product/${id}`}>
                            <div className={cl.image} style={{ backgroundImage: `url(${image})` }} />
                        </Link>
                    </Row>
                </Col>

                <Col span={14}>
                    <Row align='middle' style={{ height: '100%' }}>
                        <Col span={24}>
                            <Link to={`/product/${id}`}>
                                <Paragraph ellipsis={{ rows: 1 }} style={{ fontSize: '12px', margin: 0 }}>
                                    {name}
                                </Paragraph>
                            </Link>
                        </Col>

                        <Col>
                            <Paragraph style={{ fontSize: '12px', margin: 0 }}>
                                ${price} x {quantity}
                            </Paragraph>
                        </Col>
                    </Row>
                </Col>

                <Col span={4}>
                    <Row justify='center' align='middle' style={{ height: '100%', width: '40px' }}>
                        <CloseOutlined className={cl.delete} onClick={handleDelete(id)} />
                    </Row>
                </Col>
            </Row>

            <Divider style={{ margin: 0 }} />
        </div>
    )
})
