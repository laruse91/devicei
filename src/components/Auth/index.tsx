import React, { useEffect, useState } from 'react'
import { Avatar, Col, Dropdown, Menu, message, Row, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { AuthForm } from './AuthForm'
import { useDispatch, useSelector } from 'react-redux'
import { select } from '../../selectors/selectors'
import { actions } from '../../store/auth-reducer'
import { actions as cartActions } from '../../store/cart-reducer'

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
        dispatch(cartActions.clearCart())
        message.info('You signed out')
    }
    const handleCancel = () => {
        setIsVisible(false)
    }

    const menu = (
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
    )

    return (
        <>
            {isAuth ? (
                <Dropdown overlay={menu}>
                    <div>
                        <Row justify='center'>
                            <Avatar
                                size={30}
                                src={authorizedUser?.photoURL && authorizedUser?.photoURL}
                                style={{ backgroundColor: '#87d068' }}
                                icon={<UserOutlined />}
                            />
                        </Row>

                        <Text style={{ textAlign: 'center' }} ellipsis>
                            {authorizedUser?.name}
                        </Text>
                    </div>
                </Dropdown>
            ) : (
                <div style={{ cursor: 'pointer' }} onClick={handleSignInClick}>
                    <Row justify='center'>
                        <Avatar size={30} icon={<UserOutlined />} />
                    </Row>
                    <Text style={{ textAlign: 'center' }}>Sign In</Text>
                </div>
            )}

            <AuthForm handleCancel={handleCancel} isVisible={isVisible} />
        </>
    )
}
