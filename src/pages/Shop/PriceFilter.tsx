import React, { useState } from 'react'
import { Col, Row, Slider, Typography } from 'antd'

const { Title, Text } = Typography
type TProps = {
    min?: number
    max: number
    onSliderChange: (value: number[]) => void
}

export const PriceFilter: React.FC<TProps> = React.memo(({ min = 0, max, onSliderChange }) => {
    const [value, setValue] = useState([min, max])
    const onRangeChange = (value: [number, number]) => {
        setValue(value)
    }

    return (
        <Col style={{ width: '100%' }}>
            <Title level={5}>Filter by price</Title>
            <Slider
                range
                defaultValue={[min, max]}
                step={10}
                min={min}
                max={max}
                onAfterChange={onSliderChange}
                onChange={onRangeChange}
            />
            <Row justify='space-between' align='middle' style={{ margin: '20px 0' }}>
                <Text>
                    Price: $ {value[0]} - ${value[1]}
                </Text>
            </Row>
        </Col>
    )
})
