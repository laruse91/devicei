import React, { CSSProperties } from 'react'
import { Col, Row } from 'antd'
import Title from 'antd/es/typography/Title'
import { Gutter } from 'antd/lib/grid/row'

type TProps = {
    bgColor?: string
    title?: string
    gutter?: [Gutter, Gutter]
    justify?: 'space-between' | 'center' | 'start' | 'end' | 'space-around' | undefined
    align?: 'middle' | 'top' | 'bottom' | 'stretch'
    verticalPadding?: number
    reverse?: boolean
}

export const Section: React.FC<TProps> = React.memo(
    ({
         title,
         bgColor,
         gutter,
         children,
         verticalPadding = 0,
         reverse = false,
         justify = 'center',
         align,
     }) => {
        const bg = bgColor ? bgColor : ''
        const style: CSSProperties = !reverse ? { flexDirection: 'row' } : { flexDirection: 'row-reverse' }

        return (

            <Row justify='center' align='middle' style={{ background: `${bg}`, padding: `${verticalPadding}px 0` }}>
                <Col xs={22} md={20} xl={18} xxl={16}>
                    {title && <Title level={2}>{title}</Title>}
                    <Row justify={justify} gutter={gutter} style={style} align={align}>
                        {children}
                    </Row>
                </Col>
            </Row>

        )
    },
)
