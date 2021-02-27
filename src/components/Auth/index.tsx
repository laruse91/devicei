import React, { useEffect, useState } from 'react'
import { Avatar, Dropdown, Menu, message, Row, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { AuthForm } from './AuthForm'
import { useDispatch, useSelector } from 'react-redux'
import { select } from '../../selectors/selectors'
import { actions } from '../../store/auth-reducer'
import { actions as cartActions } from '../../store/cart-reducer'
import { Profile } from '../Profile'

const { Text, Paragraph } = Typography

export const Auth: React.FC = () => {
    const [isAuthFormVisible, setIsAuthFormVisible] = useState(false)
    const [isProfileVisible, setIsProfileVisible] = useState(false)

    const isAuth = useSelector(select.isAuth)
    const authorizedUser = useSelector(select.authorizedUser)
    const dispatch = useDispatch()

    useEffect(() => {
        isAuth && setIsAuthFormVisible(false)
    }, [isAuth])

    const handleSignInClick = () => {
        setIsAuthFormVisible(true)
    }
    const handleSignOutClick = () => {
        dispatch(actions.signOut())
        dispatch(cartActions.clearCart())
        message.info('You signed out')
    }
    const handleAuthFormClose = () => {
        setIsAuthFormVisible(false)
    }

    const handleProfileClick = () => {
        setIsProfileVisible(true)
    }
    const handleProfileClose = () => {
        setIsProfileVisible(false)
    }

    const menu = (
        <Menu>
            <Menu.ItemGroup title={authorizedUser?.name}>
                <Menu.Divider />

                <Menu.Item onClick={handleProfileClick}>
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
                    <div style={{ maxWidth: '150px', cursor: 'pointer' }}>
                        <Row justify='center'>
                            <Avatar
                                size={30}
                                src={authorizedUser?.photoURL && authorizedUser?.photoURL}
                                style={{ backgroundColor: '#b7e8a2' }}
                                icon={<UserOutlined />}
                            />
                        </Row>

                        <Paragraph ellipsis={{ rows: 1 }} style={{ margin: 0 }}>
                            {authorizedUser?.name}
                        </Paragraph>
                    </div>
                </Dropdown>
            ) : (
                <div style={{ cursor: 'pointer' }} onClick={handleSignInClick}>
                    <Row justify='center'>
                        <Avatar size={30} icon={<UserOutlined />} />
                    </Row>
                    <Paragraph style={{ margin: 0 }}>Sign In</Paragraph>
                </div>
            )}

            <AuthForm handleCancel={handleAuthFormClose} isVisible={isAuthFormVisible} />
            {authorizedUser && (
                <Profile isVisible={isProfileVisible} user={authorizedUser} handleClose={handleProfileClose} />
            )}
        </>
    )
}
