import React from 'react'
import { Col, Divider, Empty, Grid, InputNumber, Row, Typography } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { select } from '../../selectors/selectors'
import { CloseOutlined } from '@ant-design/icons'
import cl from './GoodsTable.module.css'
import { removeProduct, updateQuantity } from '../../store/cart-reducer'
import { s } from '../../styles/styles'
import { Link } from 'react-router-dom'

const { Text, Title, Paragraph } = Typography
const { useBreakpoint } = Grid

export const GoodsTable: React.FC = () => {
    const cartGoods = useSelector(select.cartGoods)
    const authorizedUser = useSelector(select.authorizedUser)
    const dispatch = useDispatch()
    const screen = useBreakpoint()

    const sText = { fontSize: '16px' }
    if (!screen.sm) {
        sText.fontSize = '14px'
        s.tableHeader.padding = '15px 0'
    }
    if (screen.sm) {
        s.tableHeader.padding = '25px 0'
    }

    const handleChangeQuantity = (id: string) => (value: number) => {
        dispatch(updateQuantity(authorizedUser?.userId, id, value))
    }
    const handleDelete = (id: string) => () => {
        dispatch(removeProduct(authorizedUser?.userId, id))
    }

    const rows = cartGoods.length ? (
        cartGoods.map((p) => {
            return (
                <div key={p.id}>
                    <Row className={cl.row}>
                        <Col xs={0} sm={3}>
                            <Row justify='center' align='middle' style={{ height: '100%' }}>
                                <CloseOutlined className={cl.delete} onClick={handleDelete(p.id)} />
                            </Row>
                        </Col>

                        <Col xs={5} sm={3}>
                            <Row justify='center' align='middle' style={{ height: '100%' }}>
                                <Link to={`/product/${p.id}`}>
                                    <div className={cl.image} style={{ backgroundImage: `url(${p.image})` }} />
                                </Link>
                            </Row>
                        </Col>

                        <Col xs={7} sm={6}>
                            <Row align='middle' style={{ height: '100%' }}>
                                <Link to={`/product/${p.id}`}>
                                    <Paragraph ellipsis={{ rows: 2 }} style={{ fontSize: '16px', margin: 0 }}>
                                        {p.name}
                                    </Paragraph>
                                </Link>
                            </Row>
                        </Col>

                        <Col span={4}>
                            <Row justify='center' align='middle' style={{ height: '100%' }}>
                                <Text style={sText}>${p.price}</Text>
                            </Row>
                        </Col>

                        <Col span={4}>
                            <Row justify='center' align='middle' style={{ height: '100%' }}>
                                <InputNumber
                                    size={!screen.sm ? 'middle' : 'large'}
                                    min={1}
                                    value={p.quantity}
                                    style={{ borderRadius: '10px' }}
                                    onStep={handleChangeQuantity(p.id)}
                                />
                            </Row>
                        </Col>

                        <Col span={4}>
                            <Row justify='center' align='middle' style={{ height: '100%' }}>
                                <Text style={sText}>${p.price * p.quantity}</Text>
                            </Row>
                        </Col>
                    </Row>

                    <Divider style={{ margin: 0 }} />
                </div>
            )
        })
    ) : (
        <div style={{ margin: '30px auto' }}>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span> Your Cart is empty yet</span>} />
        </div>
    )

    return (
        <>
            <Col span={24}>
                <Row style={s.tableHeader}>
                    <Col span={12}>
                        <Title style={s.tableTitle} level={5}>
                            Product
                        </Title>
                    </Col>
                    <Col span={4}>
                        <Title style={s.tableTitle} level={5}>
                            Price
                        </Title>
                    </Col>
                    <Col span={4}>
                        <Title style={s.tableTitle} level={5}>
                            Items
                        </Title>
                    </Col>
                    <Col span={4}>
                        <Title style={s.tableTitle} level={5}>
                            Total
                        </Title>
                    </Col>
                </Row>
                <div style={s.table}>{rows}</div>
            </Col>
        </>
    )
}
