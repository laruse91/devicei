import React, { CSSProperties } from 'react'
import { bigSale, feature, news, phones, randomGoods, sale } from '../../store/store'
import { NewsCard } from '../../components/cards/NewsCard'
import { Carousel, Col, Divider, Row, Space, Typography } from 'antd'
import { Section } from './Section'
import { CategoryTabs } from './CategoryTabs'
import { FeatureCard } from '../../components/cards/FeatureCard'
import { SaleCard } from '../../components/cards/SaleCard'
import { BigCard } from '../../components/cards/BigCard'
import { SmallCard } from '../../components/cards/SmallCard'
import { PromiseCard } from '../../components/cards/PromiseCard'
import { DollarTwoTone, HomeTwoTone, ThunderboltTwoTone, SafetyCertificateTwoTone } from '@ant-design/icons'
import { sFont } from '../../styles/styles'

const { Title, Text } = Typography

export const Home: React.FC = () => {
    const newsCards = news.map((n) => (
        <NewsCard key={n.id} image={n.image} title={n.title} id={n.id} tag={n.tag} date={n.date} />
    ))
    const features = feature.map((f) => {
        return <FeatureCard key={f.id} image={f.image} title={f.title} price={f.price} id={f.id} text={f.text} />
    })
    const sales = sale.map((good: any) => {
        return <SaleCard key={good.id} image={good.image} title={good.title} price={good.price} id={good.id} />
    })
    const obj = {
        url1: 'https://devicer.cmsmasters.net/wp-content/uploads/revslider/home_slider_video/01-1-1.jpg',
    }
    const contentStyle: CSSProperties = {
        color: '#fff',
        lineHeight: '500px',
        textAlign: 'center',
        background: `url(${obj.url1})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }

    const sale2: any = randomGoods(1, phones)[0]

    return (
        <main>
            <section>
                <Col style={{ height: '500px' }}>
                    <Carousel autoplay effect='fade'>
                        <div>
                            <Title style={contentStyle}>New Collection coming to town</Title>
                        </div>
                        <div>
                            <Title style={contentStyle}>New Collection coming to town</Title>
                        </div>
                    </Carousel>
                </Col>
            </section>

            <Space size={40} direction='vertical'>
                <Section justify='center' verticalPadding={40}>
                    <PromiseCard title='Home Shipping' description='Free for all order'>
                        <HomeTwoTone style={sFont(30)} />
                    </PromiseCard>

                    <PromiseCard title='Refund' description='Cash Back'>
                        <DollarTwoTone style={sFont(30)} />
                    </PromiseCard>

                    <PromiseCard title='Clients′ Support' description='Fast Service'>
                        <SafetyCertificateTwoTone style={sFont(30)} />
                    </PromiseCard>

                    <PromiseCard title='Fast Delivery' description='Best Service' border>
                        <ThunderboltTwoTone style={sFont(30)} />
                    </PromiseCard>
                </Section>

                <Section bgColor='white'>{features}</Section>
                <Section bgColor='white' gutter={[20, 0]}>
                    {sales}
                </Section>
                <Section bgColor='white' gutter={[20, 0]}>
                    <CategoryTabs />
                </Section>
                <Section title='Deal of days' verticalPadding={20}>
                    <BigCard
                        image={sale2.image}
                        price={sale2.price}
                        id={sale2.id}
                        title={sale2.title}
                        desc={sale2.description}
                    />
                    <SmallCard
                        image={bigSale.image}
                        price={bigSale.price}
                        id={bigSale.id}
                        title={bigSale.title}
                        text={bigSale.text}
                    />
                </Section>
            </Space>
            <Section title='Popular news' bgColor='white' verticalPadding={40} gutter={[20, 0]}>
                {newsCards}
            </Section>
        </main>
    )
}
