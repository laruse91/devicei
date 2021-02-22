import React from 'react'
import logo from '../../assets/logo.png'
import { Col, Image, Row } from 'antd'
import { Navbar } from '../Navbar'
import { Auth } from '../Auth'

export const Header: React.FC = () => {
    return (
        <Row justify='center'>
            <Col xs={22} xl={18} xxl={16}>
                <Row justify='space-between' align='middle'>
                    <Col>
                        <Image src='logo' fallback={logo} />
                    </Col>
                    <Col>
                        <Auth />
                    </Col>
                </Row>
                <Row>
                    <Navbar />
                </Row>
            </Col>
        </Row>
    )
}
