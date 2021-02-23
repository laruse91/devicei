import React, { useEffect, useState } from 'react'
import { Avatar, Badge, Col, Dropdown, Menu, message, Modal, Row, Typography } from 'antd'
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { sFont } from '../../styles/styles'
import { AuthForm } from './AuthForm'
import { useDispatch, useSelector } from 'react-redux'
import { select } from '../../selectors/selectors'
import { actions } from '../../store/auth-reducer'

const { Text } = Typography

export const Auth: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false)

    const isAuth = useSelector(select.isAuth)
    const authorizedUser = useSelector(select.authorizedUser)
    const dispatch = useDispatch()

    useEffect(() => {
        isAuth && setIsVisible(false)
    }, [isAuth])

    const handleSignInClick = () => {
        setIsVisible(true)
    }
    const handleSignOutClick = () => {
        dispatch(actions.signOut())
        message.info('You signed out')
    }
    const handleCancel = () => {
        setIsVisible(false)
    }

    const menu = isAuth ? (
        <Menu>
            <Menu.ItemGroup title={authorizedUser?.name}>
                <Menu.Divider />

                <Menu.Item>
                    <Text>Profile</Text>
                </Menu.Item>

                <Menu.Item onClick={handleSignOutClick}>
                    <Text>Sign out</Text>
                </Menu.Item>
            </Menu.ItemGroup>
        </Menu>
    ) : (
        <Menu>
            <Menu.Item onClick={handleSignInClick}>
                <Text>Sign In</Text>
            </Menu.Item>
        </Menu>
    )

    return (
        <>
            <Row justify='end' align='middle' gutter={20}>
                <Col xs={12}>
                    <Dropdown overlay={menu}>
                        <Avatar size={30} icon={<UserOutlined />} />
                    </Dropdown>
                </Col>

                <Col xs={12}>
                    <Badge count={5}>
                        <ShoppingCartOutlined style={sFont(25)} />
                    </Badge>
                </Col>
            </Row>

            <AuthForm handleCancel={handleCancel} isVisible={isVisible} />
        </>
    )
}
