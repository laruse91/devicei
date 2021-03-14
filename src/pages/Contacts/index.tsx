import React from 'react'
import { GMap } from '../../components/Map'
import { Section } from '../../components/common/Section'
import { BreadCrumbs } from '../../components/common/BreadCrumbs'
import { PageHeader } from '../../components/common/PageHeader'
import { Col, Row, Space, Typography } from 'antd'

const { Title, Text } = Typography

export const Contacts: React.FC = () => {
    return (
        <>
            <BreadCrumbs />
            <PageHeader />
            <Section bgColor='white'>
                <GMap
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&language=en&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
                    loadingElement={<div style={{ height: '100%', borderRadius: '20px' }} />}
                    containerElement={<div style={{ height: '400px', width: '100%', borderRadius: '20px' }} />}
                    mapElement={<div style={{ height: '100%', borderRadius: '20px' }} />} />
            </Section>
            <Section bgColor='white' verticalPadding={40}>
                <Col xs={22} sm={12} md={8}>
                    <Title level={4}>Contacts </Title>
                    <Space direction='vertical' size={10}>
                        <Row>
                            <Text strong>Address:</Text> <Text>10 Presnenskaya emb.</Text>
                        </Row>
                        <Row>
                            <Text strong>City:</Text> <Text>Moscow</Text>
                        </Row>
                        <Row>
                            <Text strong>Phone:</Text> <Text>+7 999 123 45 67</Text>
                        </Row>
                    </Space>
                </Col>
                <Col xs={22} sm={12} md={8}>
                    <Title level={4}>Consultations </Title>
                    <Space direction='vertical' size={10}>
                        <Row>
                            <Text> +7 000 111 22 33</Text>
                        </Row>
                        <Row>
                            <Text> +7 999 111 22 33</Text>
                        </Row>
                        <Row>
                            <Text> +7 999 123 45 67</Text>
                        </Row>
                    </Space>
                </Col>
                <Col xs={22} sm={12} md={8}>
                    <Title level={4}>Service </Title>
                    <Space direction='vertical' size={10}>
                        <Row>
                            <Text strong>Address:</Text> <Text> 8-10-12 Sadovaya-Kudrinskaya st.</Text>
                        </Row>
                        <Row>
                            <Text strong>City:</Text> <Text> Moscow</Text>
                        </Row>
                        <Row>
                            <Text strong>Phone:</Text> <Text> +7 999 123 45 67</Text>
                        </Row>
                    </Space>
                </Col>
            </Section>
        </>


    )
}
