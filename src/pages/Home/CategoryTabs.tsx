import React, { useEffect, useState } from 'react'
import { Row, Tabs } from 'antd'
import { ProductCard } from '../../components/cards/ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import { select } from '../../selectors/selectors'
import { requestTabGoods } from '../../store/home-reducer'
import { TTabs } from '../../types/types'

const { TabPane } = Tabs

export const CategoryTabs = () => {
    const [tab, setTab] = useState<TTabs>('rate')

    const tabGoods = useSelector(select.tabGoods)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(requestTabGoods())
    }, [])

    const handleTabChange = (key: string) => {
        setTab(key as TTabs)
    }

    const cards = !tabGoods ? null : tabGoods[tab].map((g) => <ProductCard key={g.id} goods={g} />)

    if (!tabGoods) {
        return <>'...loading'</>
    } else {
        return (
            <Tabs defaultActiveKey='recent' onChange={handleTabChange}>
                <TabPane tab='Top Rated' key='rate'>
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
