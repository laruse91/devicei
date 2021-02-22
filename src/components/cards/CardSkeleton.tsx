import React, { memo } from 'react'
import { Col, Grid, Row, Skeleton, Typography } from 'antd'
import { s } from '../../styles/styles'

const { Title, Paragraph } = Typography
const { useBreakpoint } = Grid

type TResponsive = {
    xs: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
    xxl?: number
}

type TProps = {
    rows?: number
    responsive?: TResponsive
}

export const CardSkeleton: React.FC<TProps> = memo(({ rows = 4, responsive = { xs: 12, sm: 12, md: 8, lg: 6 } }) => {
    const style = {
        borderRadius: '5px',
        margin: '20px 0',
        minHeight: '200px',
        backgroundColor: '#f9f9f9',
    }
    return (
        <Col
            xs={responsive.xs}
            sm={responsive.sm}
            md={responsive.md}
            lg={responsive.lg}
            xl={responsive.xl}
            xxl={responsive.xxl}>
            <Row justify='space-around' style={s.productCard}>
                <Col xs={10} sm={20} style={style} />

                <Col xs={10} sm={20} style={{ marginTop: '10px' }}>
                    <Skeleton active paragraph={{ rows: rows }} />
                </Col>
            </Row>
        </Col>
    )
})
