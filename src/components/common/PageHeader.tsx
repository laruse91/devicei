import React from 'react'
import { Divider, Typography } from 'antd'
import { Section } from './Section'
import { useLocation } from 'react-router-dom'
import { capitalize } from '../../utils/helpers'

const { Title } = Typography
type TProps = {
    customTitle?: string
    verticalPadding?: number
}

export const PageHeader: React.FC<TProps> = ({ customTitle ,verticalPadding}) => {
    const location = useLocation()
    const title = location.pathname.split('/').slice(-1)[0]

    return (
        <Section justify='start' bgColor='white' verticalPadding={verticalPadding}>
            <Title style={{ margin:  0 }}>{customTitle || capitalize(title)}</Title>
            <Divider />
        </Section>
    )
}
