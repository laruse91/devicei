import React from 'react'
import { Col, Row } from 'antd'
import { Navbar } from '../Navbar'
import { Auth } from '../Auth'
import { Cart } from '../Cart'
import { Logo } from '../Logo'

export const Header: React.FC = () => {
    return (
        <Row justify='center'>
            <Col xs={22} md={20} xl={18} xxl={16}>
                <Row justify='space-between' align='middle'>
                    <Col span={10}>
                        <Logo />
                    </Col>

                    <Col xs={14}>
                        <Row justify='end' align='middle' gutter={20}>
                            <Col>
                                <Auth />
                            </Col>
                            <Col>
                                <Cart />
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Row>
                    <Navbar />
                </Row>
            </Col>
        </Row>
    )
}
