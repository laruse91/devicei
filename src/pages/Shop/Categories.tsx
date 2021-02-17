import React, { memo } from 'react'
import { Row, Select, Typography } from 'antd'
import { TCategories } from '../../types/types'

const { Option } = Select
const { Title } = Typography
type TProps = {
    onSelect: (value: string) => void
    categories: TCategories
    current: string | undefined
}
export const Categories: React.FC<TProps> = memo(({ current, onSelect, categories }) => {
    const category = !current ? '' : current

    const options = categories?.map((c) => {
        return (
            <Option key={c} value={c}>
                {c[0].toUpperCase() + c.slice(1)}
            </Option>
        )
    })
    return (
        <>
            <Title level={5}>Product categories</Title>
            <Select value={category} style={{ width: '100%' }} onChange={onSelect}>
                {options}
            </Select>
        </>
    )
})
