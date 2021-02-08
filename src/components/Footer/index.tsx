import React from 'react'
import { Col, Row, Space } from 'antd'
import { Typography } from 'antd'
import { FacebookOutlined, GithubOutlined, GoogleOutlined, InstagramOutlined, TwitterOutlined } from '@ant-design/icons'
import { s } from '../../styles/styles'

const { Text } = Typography

export const Footer: React.FC = () => {
    return (
        <footer style={s.footer}>
            <Row justify='center'>
                <Col xs={18} xxl={16}>
                    <Row justify='space-between' align='middle'>
                        <Text style={s.footText}>This is a sample website © 2021 / Ruslan Lazarev</Text>
                        <Col>
                            <Space size={10}>
                                <InstagramOutlined style={s.footIcon} />
                                <GoogleOutlined style={s.footIcon} />
                                <FacebookOutlined style={s.footIcon} />
                                <GithubOutlined style={s.footIcon} />
                                <TwitterOutlined style={s.footIcon} />
                            </Space>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </footer>
    )
}
