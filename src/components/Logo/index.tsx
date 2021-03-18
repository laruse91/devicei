import React from 'react'
import { Badge, Col, Row, Typography } from 'antd'
import { s } from '../../styles/styles'

const { Title } = Typography

export const Logo: React.FC = () => {
    return (
        < >
            <div style={{display:'flex'}}>
                <Title level={2} style={{ margin: 0 }}>Device</Title>
                <Col style={{ marginLeft: '10px' }}>
                    <div><Badge status='processing' /></div>
                    <div style={s.logoStick} />
                </Col>
            </div>
            <Row>
                <Badge color='cyan' />
                <Badge color='lime' />
                <Badge color='magenta' />
            </Row>
        </>
    )
}