import React, { CSSProperties } from 'react'
import logo from '../../assets/logo.png'
import { Col, Image, Row } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { Navbar } from '../Navbar'
import { s, sFont } from '../../styles/styles'

export const Header: React.FC = () => {
    return (
        <Row justify='center'>
            <Col xs={22} xl={18} xxl={16}>
                <Row justify='space-between' align='middle'>
                    <Col>
                        <Image src='logo' fallback={logo} />
                    </Col>
                    <Col>
                        <ShoppingCartOutlined style={sFont(30)} />
                    </Col>
                </Row>
                <Row>
                    <Navbar />
                </Row>
            </Col>
        </Row>
    )
}
