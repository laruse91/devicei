import React, { useState } from 'react'
import { Checkbox, Col, Row } from 'antd'
import { CheckboxValueType } from 'antd/es/checkbox/Group'

type TProps = {
    checked: string[]
    options: string[]
    onChange: (value: CheckboxValueType[]) => void
}

export const CheckList: React.FC<TProps> = React.memo(({ checked, options, onChange }) => {
    const items = options.map((brand) => {
        return (
            <Row key={brand}>
                <Checkbox value={brand}>{brand}</Checkbox>
            </Row>
        )
    })

    return (
        <Checkbox.Group value={checked} style={{ width: '100%' }} onChange={onChange}>
            <Col xs={24}>{items}</Col>
        </Checkbox.Group>
    )
})
