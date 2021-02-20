import React, { CSSProperties } from 'react'
import { Col, Divider, Grid, Row, Typography } from 'antd'

const { Title, Text } = Typography
const { useBreakpoint } = Grid

type TProps = {
    title: string
    description: string
}

export const PromiseCard: React.FC<TProps> = React.memo(({ title, description, children }) => {
    const screen = useBreakpoint()
    const justify = !screen.sm ? 'start' : 'center'

    return (
        <Col xs={12} sm={6} md={6} style={{ padding: '0 5px' }}>
            <Row justify={justify} align='middle' gutter={[10, 0]} style={{ height: '100%' }}>
                <Col xs={6} sm={24} md={24} lg={6}>
                    <Row align='middle' justify='center'>
                        {children}
                    </Row>
                </Col>
                <Col>
                    <Col>
                        <Title level={5}>{title}</Title>
                        <Text>{description}</Text>
                    </Col>
                </Col>
            </Row>
            <Divider style={{ margin: '5px' }} />
        </Col>
    )
})
