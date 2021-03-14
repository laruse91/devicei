import React from 'react'
import { Col, Row, Slider, Typography } from 'antd'

const { Title, Text } = Typography
type TProps = {
    min?: number
    max: number
    onRangeChange: (value: [number, number]) => void
    currentRange: [number, number] | undefined
}

export const PriceFilter: React.FC<TProps> = React.memo(({ currentRange, min = 0, max, onRangeChange }) => {
    const range: [number, number] = currentRange ? currentRange : [min, max]

    return (
        <Col style={{ width: '100%' }}>
            <Title level={5}>Filter by price</Title>
            <Slider range defaultValue={range} step={10} min={min} max={max} onAfterChange={onRangeChange} />
            <Row justify='space-between' align='middle' style={{ margin: '20px 0' }}>
                <Text>
                    Price: $ {range[0]} - ${range[1]}
                </Text>
            </Row>
        </Col>
    )
})
