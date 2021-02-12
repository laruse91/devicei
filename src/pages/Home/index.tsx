import React, { useEffect } from 'react'
import { NewsCard } from '../../components/cards/NewsCard'
import { Space, Typography } from 'antd'
import { Section } from './Section'
import { CategoryTabs } from './CategoryTabs'
import { FeatureCard } from '../../components/cards/FeatureCard'
import { SaleCard } from '../../components/cards/SaleCard'
import { BigCard } from '../../components/cards/BigCard'
import { SmallCard } from '../../components/cards/SmallCard'
import { PromiseCard } from '../../components/cards/PromiseCard'
import { DollarTwoTone, HomeTwoTone, SafetyCertificateTwoTone, ThunderboltTwoTone } from '@ant-design/icons'
import { sFont } from '../../styles/styles'
import { useDispatch, useSelector } from 'react-redux'
import { select } from '../../selectors/selectors'
import { requestData } from '../../store/home-reducer'
import { Carousell } from './Carousell'

const { Title } = Typography

export const Home: React.FC = () => {
    //useSelector
    const features = useSelector(select.features)
    const sale = useSelector(select.sale)
    const superSaleOfDay = useSelector(select.superSaleOfDay)
    const news = useSelector(select.news)
    //useDispatch
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(requestData())
    }, [])

    const featureCards = features?.map((f) => {
        return <FeatureCard key={f.id} image={f.image} brand={f.brand} price={f.price} id={f.id} title={f.title} />
    })
    const newsCards = news?.map((n) => {
        return <NewsCard key={n.id} image={n.image} title={n.title} id={n.id} tag={n.tag} date={n.date} />
    })
    const salesCards = sale?.map((g) => {
        return <SaleCard key={g.id} image={g.image} title={g.title} price={g.price} id={g.id} />
    })

    if (!features || !sale || !superSaleOfDay || !news) {
        return <>...loading</>
    } else {
        return (
            <main>
                <Carousell />

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

                    <Section bgColor='white'>{featureCards}</Section>
                    <Section bgColor='white' gutter={[20, 0]}>
                        {salesCards}
                    </Section>
                    <Section bgColor='white' gutter={[20, 0]}>
                        <CategoryTabs />
                    </Section>
                    <Section title='Deal of days' verticalPadding={20}>
                        <BigCard
                            image={superSaleOfDay.bigCard.image}
                            price={superSaleOfDay.bigCard.price}
                            id={superSaleOfDay.bigCard.id}
                            title={superSaleOfDay.bigCard.title}
                            description={superSaleOfDay.bigCard.description}
                        />
                        <SmallCard
                            image={superSaleOfDay.smallCard.image}
                            price={superSaleOfDay.smallCard.price}
                            id={superSaleOfDay.smallCard.id}
                            title={superSaleOfDay.smallCard.title}
                            brand={superSaleOfDay.smallCard.brand}
                        />
                    </Section>
                </Space>
                <Section title='Popular news' bgColor='white' verticalPadding={40} gutter={[20, 0]}>
                    {newsCards}
                </Section>
            </main>
        )
    }
}
