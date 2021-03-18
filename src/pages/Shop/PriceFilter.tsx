import React, { useEffect, useState } from 'react'
import { Col, Row, Slider, Typography } from 'antd'

const { Title, Text } = Typography
type TProps = {
    min?: number
    max: number
    onRangeChange: (value: [number, number]) => void
    currentRange: [number | undefined, number | undefined]
}

export const PriceFilter: React.FC<TProps> = React.memo(({ currentRange, min = 0, max, onRangeChange }) => {
    const [range, setRange] = useState<[number, number]>([currentRange[0] || min, currentRange[1] || max])

    const updateRange = ()=>setRange([currentRange[0] || min, currentRange[1] || max])

    useEffect(() => {
        if (currentRange[0] || currentRange[1]) updateRange()
    }, [])
    useEffect(() => {updateRange()}, [currentRange])

    const handleRangeChange = (value: [number, number]) => setRange(value)

    return (
        <Col style={{ width: '100%' }}>
            <Title level={5}>Filter by price</Title>
            <Slider range value={range} defaultValue={range} step={10} min={min} max={max}
                    onChange={handleRangeChange} onAfterChange={onRangeChange}/>
            <Row justify='space-between' align='middle' style={{ margin: '20px 0' }}>
                <Text>
                    Price: $ {range[0]} - ${range[1]}
                </Text>
            </Row>
        </Col>
    )
})
