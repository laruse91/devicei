import React, { useEffect, useState } from 'react'
import { Menu, Row } from 'antd'
import { HomeOutlined, InfoCircleOutlined, ProjectOutlined, ShoppingOutlined } from '@ant-design/icons'
import { NavLink, useLocation } from 'react-router-dom'
import { sFont } from '../../styles/styles'

// todo: remove any
export const Navbar: React.FC = () => {
    const [current, setCurrent] = useState<string>('home')
    const handleClick = (e: any) => {
        setCurrent(e.key)
    }
    const location = useLocation()
    console.log(location.pathname)
    useEffect(() => {
        setCurrent(location.pathname.slice(1))
    }, [])

    return (
        <nav>
            <Row>
                <Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal' style={sFont(18)}>
                    <Menu.Item key='home' icon={<HomeOutlined style={sFont(16)} />}>
                        <NavLink to='/home'>Home</NavLink>
                    </Menu.Item>
                    <Menu.Item key='shop' icon={<HomeOutlined style={sFont(16)} />}>
                        <NavLink to='/shop'>Shop</NavLink>
                    </Menu.Item>

                    <Menu.Item key='news' icon={<ProjectOutlined style={sFont(16)} />}>
                        <NavLink to='/news'>News</NavLink>
                    </Menu.Item>

                    <Menu.SubMenu key='about' icon={<InfoCircleOutlined style={sFont(16)} />} title='About'>
                        <Menu.Item key='About Us'>Option 1</Menu.Item>
                        <Menu.Item key='Contacts'>Option 2</Menu.Item>
                        <Menu.Item key='FAQ'>Option 3</Menu.Item>
                    </Menu.SubMenu>
                </Menu>
            </Row>
        </nav>
    )
}
