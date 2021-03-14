import React from 'react'
import { Section } from '../../components/common/Section'
import { Col, Row, Skeleton } from 'antd'
import { BreadCrumbs } from '../../components/common/BreadCrumbs'
import { s } from '../../styles/styles'

export const ProductSkeleton: React.FC = () => {

    return (
        <>
            <BreadCrumbs />

            <Section bgColor='white' verticalPadding={20}>
                <Col xs={20} sm={10} md={12} lg={12} style={{ padding: '20px 40px 0 0' }}>
                    <Row justify='center' align='middle' style={s.imageWrapper}>
                        <Skeleton.Image style={{ background: '#f2f2f2' }} />
                    </Row>
                </Col>

                <Col xs={24} sm={14} md={12} lg={12}>
                    <Skeleton paragraph={{ rows: 6 }} />
                    <Row style={{ margin: '20px 0' }}>
                        <Skeleton.Button active shape='round' style={{ width: 100 }} />
                    </Row>
                </Col>
            </Section>

            <Section verticalPadding={20} bgColor='white' justify='center'>
                <Skeleton paragraph={{ rows: 6 }} />
            </Section>

        </>
    )
}
