import { Avatar, Col, Rate, Row, Typography } from 'antd'
import React, { memo } from 'react'
import { UserOutlined } from '@ant-design/icons'
import { sFont } from '../../styles/styles'

const { Title, Text, Paragraph } = Typography

type TProps = {
    userName: string
    userPhoto: string | null
    date: string
    comment: string
    rate: number | string
}

export const Comment: React.FC<TProps> = memo(({ userName, userPhoto, date, comment, rate }) => {
    const photo = !userPhoto ? <Avatar size='large' icon={<UserOutlined />} /> : <Avatar size='large' src={userPhoto} />

    return (
        <Col>
            <Row align='middle' style={{ marginBottom: '10px' }}>
                <Rate disabled defaultValue={+rate} style={sFont(14)} />
                <Text style={{ marginLeft: '10px' }} type='secondary'>
                    {date}
                </Text>
            </Row>

            <Row align='top'>
                {photo}
                <Col xs={20} style={{ padding: '0 10px' }}>
                    <Title level={5}>{userName}</Title>
                    <Paragraph>{comment}</Paragraph>
                </Col>
            </Row>
        </Col>
    )
})
