import React from 'react'
import { Col, Layout, Row } from 'antd'
import Title from 'antd/es/typography/Title'
import { Gutter } from 'antd/lib/grid/row'

type TProps = {
    bgColor?: string
    title?: string
    gutter?: [Gutter, Gutter]
    justify?: 'space-between' | 'center' | 'start' | 'end' | 'space-around' | undefined
    verticalPadding?: number
}

export const Section: React.FC<TProps> = React.memo(
    ({ title, bgColor, justify = 'space-between', gutter, children, verticalPadding = 0 }) => {
        const bg = bgColor ? bgColor : ''

        return (
            <Layout style={{ background: `${bg}`, padding: `${verticalPadding}px 0` }}>
                <Row justify='center' align='middle'>
                    <Col xs={18} xxl={16}>
                        {title && <Title level={2}>{title}</Title>}
                        <Row justify={justify} gutter={gutter}>
                            {children}
                        </Row>
                    </Col>
                </Row>
            </Layout>
        )
    }
)
