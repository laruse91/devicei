import React from 'react'
import { Col, Row } from 'antd'
import { Navbar } from '../Navbar'
import { Auth } from '../Auth'
import { Cart } from '../Cart'
import { Logo } from '../Logo'
import { Link } from 'react-router-dom'

export const Header: React.FC = () => {
    return (
        <Row justify='center'>
            <Col xs={22} md={20} xl={18} xxl={16}>
                <Row justify='space-between' align='middle'>
                    <Col>
                        <Link to={'/home'}>
                            <Logo />
                        </Link>
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
