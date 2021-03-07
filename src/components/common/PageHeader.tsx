import React from 'react'
import { Divider, Typography } from 'antd'
import { Section } from './Section'
import { useLocation } from 'react-router-dom'
import { capitalize } from '../../utils/helpers'

const {Title} = Typography

export const PageHeader = () => {
    const location = useLocation()
    const title = location.pathname.split('/').slice(-1)[0]

    return (
        <Section justify='start' bgColor='white' verticalPadding={40}>
            <Title style={{ margin: '0' }}>{capitalize(title)}</Title>
            <Divider />
        </Section>
    )
}
