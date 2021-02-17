import React, {ChangeEvent, memo, useState} from 'react'
import {Button, Form, Input, Rate, Typography} from 'antd'
import {sFont} from '../../styles/styles'
import {TReviewForm} from '../../types/types'

const {TextArea} = Input
const {Title} = Typography

type TProps = {
    formTitle: string
    handleSubmit: (value: TReviewForm) => void
}

export const CommentForm: React.FC<TProps> = memo(({handleSubmit, formTitle}) => {
    const [rate, setRate] = useState<number>(0)
    const [value, setValue] = useState<string>('')

    const handleRateChange = (value: number) => setRate(value)
    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value)

    return (
        <>
            <Title level={5}>{formTitle}</Title>

            <Form name='newComment' onFinish={handleSubmit}>
                <Form.Item name='rate' rules={[{required: true, type: 'number', min: 1, message: 'Put a rate'}]}>
                    <Rate value={rate} onChange={handleRateChange} style={sFont(16)} />
                </Form.Item>

                <Form.Item name='comment' rules={[{required: true, message: 'Field is required!'}]}>
                    <TextArea
                        rows={4}
                        placeholder='Your review'
                        value={value}
                        onChange={handleInputChange}
                        style={{borderRadius: '15px'}}
                    />
                </Form.Item>

                <Form.Item>
                    <Button type='primary' shape='round' htmlType='submit'>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
})
