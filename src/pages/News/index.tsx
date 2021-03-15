import React, { useEffect } from 'react'
import { Section } from '../../components/common/Section'
import { useDispatch, useSelector } from 'react-redux'
import { select } from '../../selectors/selectors'
import { NewsCard } from '../../components/cards/NewsCard'
import { getNews } from '../../store/news-reducer'
import { PageHeader } from '../../components/common/PageHeader'
import { BreadCrumbs } from '../../components/common/BreadCrumbs'
import { Article } from './Article'
import { useParams } from 'react-router-dom'
import { fillArray } from '../../utils/helpers'
import { Col, Skeleton } from 'antd'

export const News: React.FC = () => {

    const params: { id: string } = useParams()

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getNews())
    }, [])

    const news = useSelector(select.News)

    const newsCards = !news
        ? fillArray(12).map((i) => <Col key={i} xs={22} sm={12} md={8}><Skeleton /></Col>)
        : news.map((n) => {
            return <NewsCard key={n.id} image={n.image} title={n.title} id={n.id} tag={n.tag} date={n.date} />
        })

    if (params.id) {
        return (
            <Article id={params.id} />
        )

    }

    return (
        <>
            <BreadCrumbs />
            <PageHeader />

            <Section bgColor='white' gutter={[20, 40]} align='top'>
                {newsCards}
            </Section>
        </>
    )
}
