import React, { CSSProperties } from 'react'
import { Carousel, Col, Typography } from 'antd'
import { useSelector } from 'react-redux'
import { select } from '../../selectors/selectors'

const { Title, Text } = Typography

export const Carousell: React.FC = () => {
    //useSelector
    const carousel = useSelector(select.carousel)

    const SContent = (url: string): CSSProperties => ({
        color: '#fff',
        lineHeight: '500px',
        textAlign: 'center',
        background: `url(${url})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    })
    const carouselItems = carousel?.map((c) => {
        return (
            <div key={c.image}>
                <Title style={SContent(c.image)}>{c.title}</Title>
                <Text>{c.description}</Text>
            </div>
        )
    })

    return (
        <section>
            <Col style={{ height: '500px' }}>
                <Carousel autoplay effect='fade'>
                    {carouselItems}
                </Carousel>
            </Col>
        </section>
    )
}
