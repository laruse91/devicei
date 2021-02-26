import React from 'react'
import logo from '../../assets/logo.png'
import { Col, Image, Row } from 'antd'
import { Navbar } from '../Navbar'
import { Auth } from '../Auth'
import { Cart } from '../Cart'

export const Header: React.FC = () => {
    return (
        <Row justify='center'>
            <Col xs={22} xl={18} xxl={16}>
                <Row justify='space-between' align='middle'>
                    <Col>
                        <Image src='logo' fallback={logo} />
                    </Col>
                    <Col>
                        <Row justify='end' align='middle' gutter={20}>
                            <Col xs={18}>
                                <Auth />
                            </Col>
                            <Col xs={6}>
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
