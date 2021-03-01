import React, { useState } from 'react'
import { TContacts, TAuthorizedUser } from '../../types/types'
import * as Yup from 'yup'
import 'yup-phone'
import { useDispatch } from 'react-redux'
import { FormikHelpers, useFormik } from 'formik'
import { addUserContacts } from '../../store/auth-reducer'
import { Button, Col, Divider, Form, Input, message, Row } from 'antd'
import { sFont } from '../../styles/styles'

type TProps = {
    user: TAuthorizedUser
    contacts: TContacts | null
    handleClose: () => void
}
type TForm = {
    phone: string
    city: string
    street: string
    house: string
    flat: string

    error: null | string
}
type TFields = keyof TForm

const validationSchema = Yup.object().shape({
    phone: Yup.string().phone('RU', true, 'Phone num ex.: 999 123 45 67').max(10, 'Phone num ex.: 999 123 45 67'),
})

export const AddressForm: React.FC<TProps> = ({ user, contacts, handleClose }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const dispatch = useDispatch()

    const initialValues = {
        phone: contacts?.phoneNumber || '',
        city: contacts?.city || '',
        street: contacts?.street || '',
        house: contacts?.house || '',
        flat: contacts?.flat || '',
        error: null,
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        validateOnBlur: true,
        onSubmit: async (values: TForm, { setErrors }: FormikHelpers<any>) => {
            try {
                setIsLoading(true)
                const contacts: TContacts = {
                    phoneNumber: values.phone,
                    city: values.city,
                    street: values.street,
                    house: values.house,
                    flat: values.flat,
                }
                await dispatch(addUserContacts(user.userId, contacts))
                message.success('Contacts updated')
                setTimeout(() => handleClose(), 500)
            } catch (error) {
                setErrors({ error: error.message })
            } finally {
                setIsLoading(false)
            }
        },
    })

    const validateStatus = (field: TFields) => {
        return formik.errors[field] || formik.errors.error ? 'error' : undefined
    }
    const help = (field: TFields) => {
        return formik.errors[field] || undefined
    }

    return (
        <Form name='address' onFinish={formik.handleSubmit} initialValues={formik.initialValues}>
            <p style={sFont(16)}>Address</p>
            <Form.Item
                valuePropName='phone'
                label='Phone:'
                name='phone'
                validateStatus={validateStatus('phone')}
                help={help('phone')}>
                <Input addonBefore={'+7'} placeholder='999 123 45 67' {...formik.getFieldProps('phone')} />
            </Form.Item>
            <Form.Item valuePropName='city' label='City:' name='city'>
                <Input {...formik.getFieldProps('city')} />
            </Form.Item>
            <Form.Item valuePropName='street' label='Street:' name='street'>
                <Input {...formik.getFieldProps('street')} />
            </Form.Item>
            <Row gutter={20}>
                <Col span={12}>
                    <Form.Item valuePropName='house' label='House:' name='house'>
                        <Input {...formik.getFieldProps('house')} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item valuePropName='flat' label='Flat:' name='flat'>
                        <Input {...formik.getFieldProps('flat')} />
                    </Form.Item>
                </Col>
            </Row>

            <Divider />

            <div style={{ textAlign: 'right' }}>
                <Button onClick={handleClose} style={{ marginRight: 8 }}>
                    Cancel
                </Button>
                <Button htmlType='submit' type='primary' loading={isLoading}>
                    Submit
                </Button>
            </div>
        </Form>
    )
}
