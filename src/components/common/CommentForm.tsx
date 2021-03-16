import React, { ChangeEvent, memo, useState } from 'react'
import { Button, Form, Input, Rate, Typography } from 'antd'
import { sFont } from '../../styles/styles'
import { TReviewForm } from '../../types/types'

const { TextArea } = Input
const { Title } = Typography

type TProps = {
    formTitle: string
    isAuth: boolean
    handleSubmit: (value: TReviewForm) => void
}

export const CommentForm: React.FC<TProps> = memo(({ handleSubmit, isAuth, formTitle }) => {
    const [rate, setRate] = useState<number>(0)
    const [value, setValue] = useState<string>('')
    const [form] = Form.useForm()

    const handleRateChange = (value: number) => setRate(value)
    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value)
    const handleFinish = (values: TReviewForm) => {
        handleSubmit(values)
        form.resetFields()
    }

    const help = isAuth ? null : 'Sign in to be able to add review'

    return (
        <>
            <Title level={5}>{formTitle}</Title>

            <Form form={form} onFinish={handleFinish}>
                <Form.Item name='rate' help={help}
                           rules={[{ required: true, type: 'number', min: 1, message: 'Put a rate' }]}>
                    <Rate disabled={!isAuth} value={rate} onChange={handleRateChange} style={sFont(16)} />
                </Form.Item>

                <Form.Item name='comment' rules={[{ required: true, message: 'Field is required!' }, {
                    max: 300, message: 'Maximum 300 symbols',
                }]}>
                    <TextArea
                        disabled={!isAuth}
                        rows={4}
                        placeholder='Your review'
                        value={value}
                        onChange={handleInputChange}
                        style={{ borderRadius: '15px' }} />
                </Form.Item>

                <Form.Item>
                    <Button disabled={!isAuth} type='primary' shape='round' htmlType='submit'>
                        Submit
                    </Button>
                </Form.Item>

            </Form>
        </>
    )
})
