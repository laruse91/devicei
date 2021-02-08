import React, { CSSProperties } from 'react'
import logo from '../../assets/logo.png'
import { Col, Image, Row } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { Navbar } from '../Navbar'
import { s, sFont } from '../../styles/styles'

export const Header: React.FC = () => {
    return (
        <header style={s.header}>
            <Row justify='center'>
                <Col xs={18}>
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
        </header>
    )
}
