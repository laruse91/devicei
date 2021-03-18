import React, { useEffect, useState } from 'react'
import { Row, Tabs } from 'antd'
import { ProductCard } from '../../components/cards/ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import { select } from '../../selectors/selectors'
import { getGoods } from '../../store/home-reducer'
import { TTabs } from '../../types/types'
import { fillArray } from '../../utils/helpers'
import { CardSkeleton } from '../../components/cards/CardSkeleton'

const { TabPane } = Tabs

export const CategoryTabs = () => {
    const [tab, setTab] = useState<TTabs>('rate')

    const tabGoods = useSelector(select.tabGoods)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getGoods(['rate', 'new'], 4, 'tab'))
    }, [])

    const handleTabChange = (key: string) => {
        setTab(key as TTabs)
    }
    const responsive = { xs: 12, sm: 8, md: 6, lg: 6, xxl: 6 }

    const cards = !tabGoods
        ? fillArray(4).map((card) => {
            return <CardSkeleton key={card} responsive={responsive} />
        })
        : tabGoods[tab].map((g) => {
            return <ProductCard key={g.id} product={g} responsive={responsive} />
        })

    return (
        <Tabs defaultActiveKey={tab} onChange={handleTabChange} style={{ padding: '0 10px 10px', width: '100%' }}>
            <TabPane tab='Top Rated' key='rate' style={{ maxHeight: '410px' }}>
                <Row justify='space-between' gutter={[10, 10]}>
                    {cards}
                </Row>
            </TabPane>
            <TabPane tab='New' key='new'>
                <Row gutter={[10, 10]} justify='space-between'>
                    {cards}
                </Row>
            </TabPane>
        </Tabs>
    )
}
