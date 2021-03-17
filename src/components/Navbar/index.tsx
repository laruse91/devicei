import React, { useEffect, useState } from 'react'
import { Menu, Row } from 'antd'
import { HomeOutlined, InfoCircleOutlined, ProjectOutlined } from '@ant-design/icons'
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom'
import { sFont } from '../../styles/styles'
import { useDispatch, useSelector } from 'react-redux'
import { select } from '../../selectors/selectors'
import { getCategories } from '../../store/app-reducer'
import { capitalize } from '../../utils/helpers'

// todo: remove any
export const Navbar: React.FC = () => {
    const [current, setCurrent] = useState<string>('shop')
    const categories = useSelector(select.categories)
    const location = useLocation()
    const dispatch = useDispatch()

    const curLocation = location.pathname.split('/')[2] || location.pathname.split('/')[1]
    useEffect(() => {
        dispatch(getCategories())
        setCurrent(curLocation)
    }, [])

    const handleClick = (e: any) => {
        setCurrent(e.key)
    }

    const items = categories?.map((c) => {
        return (
            <Menu.Item key={c}>
                <Link to={'/shop/' + c}>{capitalize(c)} </Link>
            </Menu.Item>
        )
    })
    return (
        <nav>
            <Menu onSelect={handleClick} selectedKeys={[current]} mode='horizontal' style={sFont(16)}>
                <Menu.Item key='home' icon={<HomeOutlined style={sFont(14)} />}>
                    <NavLink to='/home'>Home</NavLink>
                </Menu.Item>

                <Menu.SubMenu
                    icon={<HomeOutlined style={sFont(14)} />}
                    title='Shop'>
                    <Menu.Item key='shop'>
                        <Link to={'/shop'}>All goods</Link>
                    </Menu.Item>
                    {items}
                </Menu.SubMenu>

                <Menu.Item key='news' icon={<ProjectOutlined style={sFont(14)} />}>
                    <NavLink to='/news'>News</NavLink>
                </Menu.Item>

                <Menu.SubMenu
                    key='more'
                    icon={<InfoCircleOutlined style={sFont(14)} />}
                    title='More'>
                    <Menu.Item key='about'><NavLink to='/about'>About</NavLink></Menu.Item>
                    <Menu.Item key='contacts'><NavLink to='/contacts'>Contacts</NavLink></Menu.Item>
                    <Menu.Item key='FAQ'><NavLink to='/faq'>FAQ</NavLink></Menu.Item>
                </Menu.SubMenu>
            </Menu>
        </nav>
    )
}
