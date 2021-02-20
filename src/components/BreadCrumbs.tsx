import React from 'react'
import { Link } from 'react-router-dom'
import { Section } from './common/Section'
import { Breadcrumb } from 'antd'
import { s } from '../styles/styles'

type TProps = {
    routes: [string, string | undefined]
}

export const BreadCrumbs: React.FC<TProps> = ({ routes }) => {
    const breadcrumbItems = routes.map((r) => {
        if (!r) {
            return null
        }
        const last = routes.indexOf(r) === routes.length - 1
        return last ? (
            <Breadcrumb.Item key={r}>{r[0].toUpperCase() + r.slice(1)}</Breadcrumb.Item>
        ) : (
            <Breadcrumb.Item key={r}>
                <Link to={`/${r}`}>{r[0].toUpperCase() + r.slice(1)}</Link>
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
