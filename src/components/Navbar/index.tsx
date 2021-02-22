import React, { useEffect, useState } from 'react'
import { Menu, Row } from 'antd'
import { HomeOutlined, InfoCircleOutlined, ProjectOutlined } from '@ant-design/icons'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import { sFont } from '../../styles/styles'
import { useDispatch, useSelector } from 'react-redux'
import { select } from '../../selectors/selectors'
import { getCategories } from '../../store/app-reducer'

// todo: remove any
export const Navbar: React.FC = () => {
    const [current, setCurrent] = useState<string>('home')
    const categories = useSelector(select.categories)
    const location = useLocation()
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        if (location.pathname.split('/')[1] === 'product') {
            setCurrent('shop')
        } else {
            setCurrent(location.pathname.split('/')[1])
        }
    }, [])
    useEffect(() => {
        dispatch(getCategories())
    }, [])

    const handleClick = (e: any) => {
        setCurrent(e.key)
    }
    const handleTitleClick = (e: any) => {
        setCurrent(e.key)
        history.replace({ pathname: '/' + e.key })
    }

    const items = categories?.map((c) => {
        return (
            <Menu.Item key={c}>
                <NavLink to={'/shop/' + c}>{c[0].toUpperCase() + c.slice(1)} </NavLink>
            </Menu.Item>
        )
    })
    return (
        <nav>
            <Row>
                <Menu onSelect={handleClick} selectedKeys={[current]} mode='horizontal' style={sFont(16)}>
                    <Menu.Item key='home' icon={<HomeOutlined style={sFont(14)} />}>
                        <NavLink to='/home'>Home</NavLink>
                    </Menu.Item>

                    <Menu.SubMenu
                        key='shop'
                        onTitleClick={handleTitleClick}
                        icon={<HomeOutlined style={sFont(14)} />}
                        title='Shop'>
                        {items}
                    </Menu.SubMenu>

                    {/*<Menu.Item key='shop' icon={<HomeOutlined style={sFont(14)} />}>*/}
                    {/*    <NavLink to='/shop'>Shop</NavLink>*/}
                    {/*</Menu.Item>*/}

                    <Menu.Item key='news' icon={<ProjectOutlined style={sFont(14)} />}>
                        <NavLink to='/news'>News</NavLink>
                    </Menu.Item>

                    <Menu.SubMenu key='about' icon={<InfoCircleOutlined style={sFont(14)} />} title='About'>
                        <Menu.Item key='About Us'>Option 1</Menu.Item>
                        <Menu.Item key='Contacts'>Option 2</Menu.Item>
                        <Menu.Item key='FAQ'>Option 3</Menu.Item>
                    </Menu.SubMenu>
                </Menu>
            </Row>
        </nav>
    )
}
