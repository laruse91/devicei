import React, { CSSProperties, useEffect } from 'react'
import { Section } from '../../components/common/Section'
import { Col, Row, Typography } from 'antd'
import { select } from '../../selectors/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { getPageContent } from '../../store/content-reducer'
import { TAboutSection } from '../../types/types'
import { BreadCrumbs } from '../../components/common/BreadCrumbs'
import { PageHeader } from '../../components/common/PageHeader'

const { Title, Paragraph, Text } = Typography

export const About: React.FC = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPageContent('about'))
    }, [])

    const a = useSelector(select.about)

    const style = (url: string | undefined, height: string): CSSProperties => ({
        backgroundImage: `url(${url})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        borderRadius: '10px',
        height: height,
        width: '100%',
        padding: '10%',
    })

    const block = (card: TAboutSection | undefined, reverse: boolean = false) => {
        if (!card) return null
        return (
            <Section bgColor='white' gutter={[40, 0]} verticalPadding={40} reverse={reverse}>
                <Col xs={24} md={12} style={{ padding: '20px 50px 20px 40px' }}>
                    <Title level={5}>{card.title}</Title>
                    <Paragraph style={{ fontSize: '20px', color: '#0000008f' }}>{card.desc}</Paragraph>
                </Col>
                <Col xs={24} md={12}>
                    <div style={style(card.image, '280px')} />
                </Col>
            </Section>
        )
    }
    const numbers = a && Object.values(a.numbers).map((n) => {
        return (
            <Col xs={12} md={6} key={n.icon}>
                <Row justify='center'>
                    <img src={n.icon} alt={'ico'} style={{ height: '30px', width: '30px' }} />
                </Row>
                <Row justify='center'>
                    <Text style={{ fontSize: '35px', margin: '10px', textAlign: 'center' }}>{n.count}</Text>
                </Row>
                <Row justify='center'>
                    <Text type='secondary' style={{ textAlign: 'center' }}>{n.desc}</Text>
                </Row>
            </Col>
        )
    })

    return (
        <>
            <BreadCrumbs />
            <PageHeader/>

            <Section bgColor='white' >
                <Col style={style(a?.main.image, '50vh')}>
                    <Title>
                        {a?.main.title}
                    </Title>
                </Col>
            </Section>

            {block(a?.sections[0])}

            <Section bgColor='white' gutter={[40, 40]} verticalPadding={40}>
                {numbers}
            </Section>

            {block(a?.sections[1], true)}
        </>
    )
}
