import React, { useEffect, useState } from 'react'
import { Avatar, Badge, Col, Modal, Row, Typography } from 'antd'
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { sFont } from '../../styles/styles'
import { AuthForm } from './AuthForm'
import { useSelector } from 'react-redux'
import { select } from '../../selectors/selectors'

const { Text } = Typography

export const Auth: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false)

    const isAuth = useSelector(select.isAuth)

    useEffect(() => {
        isAuth && setIsVisible(false)
    }, [isAuth])

    const userName = 'name'

    const handleLoginClick = () => {
        setIsVisible(true)
    }
    const handleCancel = () => {
        setIsVisible(false)
    }

    return (
        <>
            <Col>
                <Row justify='space-between' align='middle' gutter={20}>
                    <Col xs={12} onClick={handleLoginClick}>
                        <Avatar size={40} icon={<UserOutlined />} />
                        <Row justify='center'>
                            <Text>{userName}</Text>
                        </Row>
                    </Col>
                    <Col xs={12}>
                        <Badge count={5}>
                            <ShoppingCartOutlined style={sFont(30)} />
                        </Badge>
                    </Col>
                </Row>
            </Col>

            <AuthForm onCancel={handleCancel} isVisible={isVisible} />
        </>
    )
}
