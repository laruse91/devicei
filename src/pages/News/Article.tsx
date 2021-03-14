import React, { useEffect } from 'react'
import { BreadCrumbs } from '../../components/common/BreadCrumbs'
import { Section } from '../../components/common/Section'
import { Image, Row, Skeleton, Typography } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { select } from '../../selectors/selectors'
import { getArticle } from '../../store/news-reducer'
import { errorImg } from '../../utils/helpers'
import { s } from '../../styles/styles'

const { Title, Paragraph, Text } = Typography

type TProps = {
    id: string
}

export const Article: React.FC<TProps> = ({ id }) => {

    const article = useSelector(select.article)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getArticle(id))
    }, [])

    const content = article?.articles.map((a, i) => {
        return (
            <Paragraph key={i} style={{ margin: '10px 0' }}>{a}</Paragraph>
        )
    })

    if (!article) {
        return (
            <>
                <BreadCrumbs />
                <Section bgColor='white'>
                    <Skeleton paragraph={{ rows: 15 }} />
                </Section>
            </>
        )
    }

    return (
        <>
            <BreadCrumbs itemTitle={article?.tag} />

            <Section bgColor='white'>

                <Row style={{ width: '100%', padding: '20px 0' }}>
                    <Title level={2}>
                        {article?.title}
                    </Title>
                </Row>

                <Row style={{ width: '100%' }}>
                    <Text style={s.tags}>{article?.tag}</Text>
                    <Text type='secondary'>{article?.date}</Text>
                </Row>

                <Image
                    width={'100%'}
                    height={'100%'}
                    src={article?.image}
                    fallback={errorImg}
                    style={{ borderRadius: '20px', margin: '10px 0 20px' }}
                    preview={false}
                />

                <Row>
                    {content}
                </Row>

            </Section>
        </>
    )
}
