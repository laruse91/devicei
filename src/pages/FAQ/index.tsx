import React, { useEffect } from 'react'
import { Skeleton, Tabs } from 'antd'
import { getPageContent } from '../../store/content-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { select } from '../../selectors/selectors'
import { fillArray } from '../../utils/helpers'
import { BreadCrumbs } from '../../components/common/BreadCrumbs'
import { PageHeader } from '../../components/common/PageHeader'
import { Section } from '../../components/common/Section'
import { TFaqCategories, TFaqGroups } from '../../types/types'

const { TabPane } = Tabs

export const FAQ: React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPageContent('faq'))
    }, [])

    const faq = useSelector(select.faq)

    const content = !faq
        ? fillArray(2).map(el => {
                return (
                    <Section verticalPadding={40} key={el}><Skeleton active /></Section>
                )
            })
        : Object.keys(faq).map(group => {
            return (
                <Section key={group} title={group} verticalPadding={20}>
                    <Tabs tabPosition='left'>
                        {
                            Object.keys(faq[group as TFaqGroups]).map(c => {
                                return (
                                    <TabPane tab={c} key={c}>
                                        {faq[group as TFaqGroups][c as TFaqCategories]}
                                    </TabPane>
                                )
                            })
                        }

                    </Tabs>
                </Section>
            )
        })

    return (
        <>
            <BreadCrumbs upperCase />
            <PageHeader title='FAQ' />
            {content}

        </>
    )
}
