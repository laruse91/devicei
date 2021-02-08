import React from 'react'
import { Col, Row, Typography } from 'antd'

const { Title, Text } = Typography

type TProps = {
    title: string
    description: string
    border?: boolean
}

export const PromiseCard: React.FC<TProps> = React.memo(({ title, description, border, children }) => {
    const borderRight = border ? `1px solid gray` : ''
    return (
        <Col xs={6} key={title} style={{ padding: `0 10px`, borderRight: borderRight, borderLeft: `1px solid gray` }}>
            <Row justify='center' align='middle' gutter={[20, 0]}>
                <Col>{children}</Col>
                <Col>
                    <Title level={4}>{title}</Title>
                    <Text>{description}</Text>
                </Col>
            </Row>
        </Col>
    )
})
