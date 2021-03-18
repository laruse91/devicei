import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Section } from './Section'
import { Breadcrumb } from 'antd'
import { s } from '../../styles/styles'
import { capitalize } from '../../utils/helpers'

type TProps = {
    upperCase?: boolean
    itemTitle?: string
}

export const BreadCrumbs: React.FC<TProps> = ({ upperCase, itemTitle }) => {

    const location = useLocation()
    const routes = location.pathname.split('/').slice(1)

    const title = (text: string) => upperCase ? text.toLocaleUpperCase() : capitalize(text)
    const breadcrumbItems = routes.map((r, i) => {
        const path = routes[i - 1] ? `/${routes[i - 1]}/${r}` : `/${r}`
        const last = routes.indexOf(r) === routes.length - 1
        return last ? (
            <Breadcrumb.Item key={r}>{itemTitle || title(r)}</Breadcrumb.Item>
        ) : (
            <Breadcrumb.Item key={r}>
                <Link to={path}>
                    {title(r)}
                </Link>
            </Breadcrumb.Item>
        )
    })

    return (
        <Section justify='start' bgColor='white' verticalPadding={10}>
            <Breadcrumb style={s.breadCrumb}>
                <Breadcrumb.Item>
                    <Link to={'/home'}>Home</Link>
                </Breadcrumb.Item>

                {breadcrumbItems}
            </Breadcrumb>
        </Section>
    )
}
