import React, { useEffect, useState } from 'react'
import { Row, Tabs } from 'antd'
import { GoodsCard } from '../../components/cards/GoodsCard'
import { useDispatch, useSelector } from 'react-redux'
import { select } from '../../selectors/selectors'
import { requestTabGoods } from '../../store/home-reducer'

const { TabPane } = Tabs

export const CategoryTabs = () => {
    console.log('tabRender')
    const [key, setKey] = useState('recent')

    const tabGoods = useSelector(select.tabGoods)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(requestTabGoods())
    }, [])

    const handleTabChange = (key: string) => {
        setKey(key)
    }

    const cards =
        tabGoods &&
        tabGoods[key].map((g) => (
            <GoodsCard key={g.id} title={g.title} id={g.id} image={g.image} price={g.price} tags={g.tags} />
        ))

    if (!tabGoods) {
        return <>'...loading'</>
    } else {
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
}
