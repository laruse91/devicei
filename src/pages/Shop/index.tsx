import React, { memo, useEffect, useState } from 'react'
import { Section } from '../Home/Section'
import { ProductCard } from '../../components/cards/ProductCard'
import { getCategories, getGoods } from '../../store/shop-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { select } from '../../selectors/selectors'
import { Breadcrumb, Col, Divider, Dropdown, Input, Menu, Pagination, Row, Select, Typography } from 'antd'
import { Link, NavLink, useHistory, useLocation, useParams } from 'react-router-dom'
import { DownOutlined } from '@ant-design/icons'
import { MenuInfo } from 'rc-menu/lib/interface'
import { PriceFilter } from './PriceFilter'
import { s } from '../../styles/styles'
import { Categories } from './Categories'
import { CheckList } from './CheckList'
import { CheckboxValueType } from 'antd/es/checkbox/Group'
import * as queryString from 'querystring'

const { Search } = Input
const { Title } = Typography
type TQueryParams = {
    page?: string
    priceFrom: string
    priceTo: string
    brand?: string[]
}

export const Shop: React.FC = memo(() => {
    const [category, setCategory] = useState<string | undefined>(undefined)
    const [brands, setBrands] = useState<string[]>([])
    const [sort, setSort] = useState<'desc' | 'asc'>('asc')
    const [price, setPrice] = useState<[number, number] | undefined>(undefined)
    const [page, setPage] = useState(1)
    console.log(category)
    const goods = useSelector(select.goods)
    const categories = useSelector(select.categories)
    const dispatch = useDispatch()

    const params: { category: string } = useParams()
    const history = useHistory()

    useEffect(() => {
        const parsed = queryString.parse(history.location.search.substr(1)) as any

        if (params.category) setCategory(params.category)
        if (parsed.page) setPage(Number(parsed.page))
        if (parsed.brand) setBrands([parsed.brand])
        if (parsed.priceFrom) setPrice([Number(parsed.priceFrom), Number(parsed.priceTo)])

        dispatch(getGoods(category, price, brands, sort, page))
        dispatch(getCategories())
    }, [])
    useEffect(() => {
        dispatch(getGoods(category, price, brands, sort, page))
        if (category) {
            history.replace({ pathname: `/shop/${category}` })
        }
        const query = {} as TQueryParams
        if (page !== 1) query.page = String(page)
        if (brands) query.brand = brands
        if (price) {
            query.priceFrom = String(price[0])
            query.priceTo = String(price[1])
        }

        history.push({
            search: queryString.stringify(query),
        })
    }, [category, brands, price, page, sort])

    const handlePageChange = (page: number) => {
        setPage(page)
    }
    const handleSorting = (key: MenuInfo) => {
        setSort(key.keyPath[0] as 'desc' | 'asc')
    }
    const handleSearch = () => {}
    const handleCategorySelect = (value: string) => {
        setCategory(value)
    }
    const handlePriceFilter = (values: [number, number]) => {
        setPrice(values)
    }
    const handleBrandChecked = (values: CheckboxValueType[]) => {
        setBrands(values as string[])
    }

    const goodsCards = goods?.items.map((g) => {
        return <ProductCard key={g.id} goods={g} size={8} />
    })
    const menu = (
        <Menu onClick={handleSorting}>
            <Menu.Item key='asc'>Price: low to height</Menu.Item>
            <Menu.Item key='desc'>Price: height to low</Menu.Item>
        </Menu>
    )
    const pageTitle = category ? category[0].toUpperCase() + category.slice(1) : 'Shop'

    if (!goods || !categories) {
        return <>...loading</>
    }

    return (
        <>
            <Section bgColor='white'>
                <Col>
                    <Breadcrumb style={s.breadCrumb}>
                        <Breadcrumb.Item>
                            <Link to={'/home'}>Home</Link>
                        </Breadcrumb.Item>
                        {!category ? (
                            <Breadcrumb.Item>Shop</Breadcrumb.Item>
                        ) : (
                            <>
                                <Breadcrumb.Item>
                                    <Link onClick={() => setCategory(undefined)} to={'/shop'}>
                                        Shop
                                    </Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>{category[0].toUpperCase() + category.slice(1)}</Breadcrumb.Item>
                            </>
                        )}
                    </Breadcrumb>

                    <Title style={{ margin: '0' }}>{pageTitle}</Title>
                </Col>
            </Section>

            <Divider />

            <Section bgColor='white' gutter={[0, 20]}>
                <Col xs={18}>
                    <Row justify='space-between' align='middle' style={{ marginBottom: '20px' }}>
                        <Col xs={4}>
                            <Dropdown overlay={menu} trigger={['click']}>
                                <a className='ant-dropdown-link' onClick={(e) => e.preventDefault()}>
                                    Sort by
                                    <DownOutlined />
                                </a>
                            </Dropdown>
                        </Col>
                        <Pagination
                            defaultCurrent={page}
                            total={goods.total}
                            defaultPageSize={12}
                            onChange={handlePageChange}
                        />
                        <Col xs={4} />
                    </Row>
                    <Row gutter={[20, 20]}>{goodsCards}</Row>
                </Col>

                <Col xs={6} style={{ padding: '0 20px 0 20px' }}>
                    <Search
                        placeholder='input search text'
                        allowClear
                        onSearch={handleSearch}
                        style={{ width: '100%' }}
                    />

                    <Row justify='center' style={{ margin: '30px 0' }}>
                        <Categories current={category} onSelect={handleCategorySelect} categories={categories} />
                    </Row>
                    <Row style={{ margin: '30px 0' }}>
                        <CheckList checked={brands} options={goods.brands} onChange={handleBrandChecked} />
                    </Row>
                    <Row justify='center'>
                        <PriceFilter
                            currentRange={price}
                            min={0}
                            max={goods.maximalPrice}
                            onRangeChange={handlePriceFilter}
                        />
                    </Row>
                </Col>
            </Section>
        </>
    )
})
