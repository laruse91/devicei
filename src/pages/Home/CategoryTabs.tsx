import React, { useState } from 'react'
import { Row, Tabs } from 'antd'
import { GoodsCard } from '../../components/cards/GoodsCard'
import { useSelector } from 'react-redux'
import { select } from '../../selectors/selectors'

const { TabPane } = Tabs

export const CategoryTabs = () => {
    const [goods, setGoods] = useState('categories')
    //useSelector
    const categories = useSelector(select.categories)

    const cards = categories?.map((g) => (
        <GoodsCard key={g.id} title={g.title} id={g.id} image={g.image} price={g.price} tags={g.tags} />
    ))

    const handleTabChange = (key: string) => {
        console.log(key)
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
