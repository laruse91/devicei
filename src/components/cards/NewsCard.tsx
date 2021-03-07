import React from 'react'
import { Col, Image, Row, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { s } from '../../styles/styles'
import { errorImg } from '../../utils/helpers'

const { Title, Text } = Typography

type TProps = {
    image: string
    title: string
    id: string
    tag: string
    date: string
}

export const NewsCard: React.FC<TProps> = React.memo(({ id, image, title, date, tag }) => {

    return (
        <Col xs={22} sm={12} md={8} style={{ borderRadius: '10px'}}>
            <Row align='top'>
                <Link to={`/news/${id}`}>
                    <Image src={image}
                           width={'100%'}
                           preview={false}
                           style={{ borderRadius: '10px' }}
                           fallback={errorImg}
                    />
                </Link>
            </Row>

            <Col>
                <Text style={s.tags}>{tag}</Text>

                <Link to={`/news/${id}`}>
                    <Title level={5}>
                        {title}
                    </Title>
                </Link>

                <Text type='secondary'>{date}</Text>
            </Col>
        </Col>
    )
})
