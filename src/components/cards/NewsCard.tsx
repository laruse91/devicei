import React from 'react'
import { Col, Row, Typography } from 'antd'
import { Link } from 'react-router-dom'

const { Title, Text } = Typography

type TProps = {
    image: string
    title: string
    id: number
    tag: string
    date: string
}

export const NewsCard: React.FC<TProps> = React.memo(({ image, title, date, tag }) => {
    return (
        <Col xs={8} style={{ borderRadius: '10px' }}>
            <Row
                style={{
                    background: `url(${image})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    cursor: 'pointer',
                    borderRadius: '10px',
                    height: '200px',
                }}
            />

            <Col>
                <Row>
                    <Link to={'#'}>{tag}</Link>
                </Row>
                <Row>
                    <Title style={{ cursor: 'pointer', marginTop: '5px' }} level={5}>
                        {title}
                    </Title>
                </Row>

                <Row>
                    <Text type='secondary'>{date}</Text>
                </Row>
            </Col>
        </Col>
    )
})
