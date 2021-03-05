import React, { CSSProperties } from 'react'
import { Col, Layout, Row } from 'antd'
import Title from 'antd/es/typography/Title'
import { Gutter } from 'antd/lib/grid/row'

type TProps = {
    bgColor?: string
    title?: string
    gutter?: [Gutter, Gutter]
    justify?: 'space-between' | 'center' | 'start' | 'end' | 'space-around' | undefined
    verticalPadding?: number
    reverse?: boolean
}

export const Section: React.FC<TProps> = React.memo(
    ({ title, bgColor, justify = 'center', gutter, children, verticalPadding = 0, reverse = false }) => {
        const bg = bgColor ? bgColor : ''
        const style: CSSProperties = !reverse ? { flexDirection: 'row' } : { flexDirection: 'row-reverse' }

            return (
                <Layout style={{ background: `${bg}`, padding: `${verticalPadding}px 0` }}>
                    <Row justify='center' align='middle'>
                        <Col xs={22} xl={18} xxl={16}>
                            {title && <Title level={2}>{title}</Title>}
                            <Row justify={justify} gutter={gutter} style={style}>
                                {children}
                            </Row>
                        </Col>
                    </Row>
                </Layout>
            )
    },
)
