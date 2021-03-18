import React, { useEffect, useState } from 'react'
import { Menu } from 'antd'
import { HomeOutlined, InfoCircleOutlined, ProjectOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Link, useLocation } from 'react-router-dom'
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
            <Menu mode='horizontal' onSelect={handleClick} selectedKeys={[current]} style={sFont(16)}>
                <Menu.Item key='home' icon={<HomeOutlined style={sFont(12)} />}>
                    <Link to='/home'>Home</Link>
                </Menu.Item>

                <Menu.SubMenu
                    icon={<ShoppingCartOutlined style={sFont(14)} />}
                    title='Shop'>
                    <Menu.Item key='shop'>
                        <Link to={'/shop'}>All goods</Link>
                    </Menu.Item>
                    {items}
                </Menu.SubMenu>

                <Menu.Item key='news' icon={<ProjectOutlined style={sFont(12)} />}>
                    <Link to='/news'>News</Link>
                </Menu.Item>

                <Menu.SubMenu
                    key='more'
                    icon={<InfoCircleOutlined style={sFont(12)} />}
                    title='More'>
                    <Menu.Item key='about'><Link to='/about'>About</Link></Menu.Item>
                    <Menu.Item key='contacts'><Link to='/contacts'>Contacts</Link></Menu.Item>
                    <Menu.Item key='FAQ'><Link to='/faq'>FAQ</Link></Menu.Item>
                </Menu.SubMenu>
            </Menu>
        </nav>
    )
}
