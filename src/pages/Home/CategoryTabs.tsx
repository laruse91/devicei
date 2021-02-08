import React from 'react'
import { Row, Tabs } from 'antd'
import { GoodsCard } from '../../components/cards/GoodsCard'
import { categories, phones, randomGoods } from '../../store/store'
import { useState } from 'react'

const { TabPane } = Tabs

export const CategoryTabs = () => {
    const [goods, setGoods] = useState(categories)
    const cards = goods.map((g) => (
        <GoodsCard key={g.id} title={g.title} id={g.id} image={g.image} price={g.price} tags={g.tags} />
    ))

    const handleTabChange = (key: string) => {
        let arr = randomGoods(4, phones)
        setGoods(arr)
    }

    return (
        <Tabs defaultActiveKey='recent' onChange={handleTabChange}>
            <TabPane tab='Recent' key='recent'>
                <Row gutter={[25, 25]} justify='space-between'>
                    {cards}
                </Row>
            </TabPane>
            <TabPane tab='Top Rated' key='topRated'>
                <Row gutter={[25, 25]} justify='space-between'>
                    {cards}
                </Row>
            </TabPane>
            <TabPane tab='Sale' key='sale'>
                <Row gutter={[25, 25]} justify='space-between'>
                    {cards}
                </Row>
            </TabPane>
        </Tabs>
    )
}
