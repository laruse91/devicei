import React, { CSSProperties, useEffect } from 'react'
import { Section } from '../../components/common/Section'
import { Col, Row, Typography } from 'antd'
import { select } from '../../selectors/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { getAbout } from '../../store/content-reducer'

const { Title, Paragraph } = Typography

export const About: React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAbout())
    }, [])

    const a = useSelector(select.about)

    const STitle: CSSProperties = {
        background: `url(${a?.main.image}) no-repeat center`,

        backgroundSize: 'cover',
        borderRadius: '20px',
        height: '400px',
        width: '100%',
    }

    return (
        <>
            <Section bgColor='white'>
                <Row style={STitle}>{a?.main.title}</Row>
            </Section>

            <Section>
                <Col>
                    <Row>
                        <Title>{a?.sections[0].title}</Title>
                        <Paragraph>{a?.sections[0].desc}</Paragraph>
                    </Row>
                </Col>
                <Col />
            </Section>
        </>
    )
}
