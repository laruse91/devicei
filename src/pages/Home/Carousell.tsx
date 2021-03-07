import React, { CSSProperties } from 'react'
import { Carousel, Col, Row, Typography } from 'antd'
import { useSelector } from 'react-redux'
import { select } from '../../selectors/selectors'

const { Title } = Typography

export const Carousell: React.FC = () => {
    const carousel = useSelector(select.carousel)

    const SContent = (url: string): CSSProperties => ({
        color: '#fff',
        lineHeight: '50vh',
        height: '50vh',
        background: `url(${url})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    })
    const carouselItems = carousel?.map((c) => {
        return (
            <div key={c.image}>
                <Row justify='center' style={SContent(c.image)}>
                    <Col xs={18}>
                        <Title
                            level={1}
                            copyable={false}
                            style={{ color: '#fff', marginTop: '2em', maxWidth: '400px' }}>
                            {c.title}
                        </Title>
                        <Title
                            level={4}
                            copyable={false}
                            style={{ color: '#b1c2c3', marginTop: '2em', maxWidth: '400px' }}>
                            {c.description}
                        </Title>
                    </Col>
                </Row>
            </div>
        )
    })

    return (
        <section>
            <Col style={{ height: '50vh' }}>
                <Carousel autoplay effect='fade'>
                    {carouselItems}
                </Carousel>
            </Col>
        </section>
    )
}
