import React, { useState } from 'react'
import { Button, Divider, Form, Input, Typography } from 'antd'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { FormikHelpers, useFormik } from 'formik'
import { sFont } from '../../styles/styles'
import { TAuthorizedUser } from '../../types/types'

const { Title, Text } = Typography

type TProps = {
    user: TAuthorizedUser
    handleClose: () => void
}

type TForm = {
    name: string | null
    email: string | null
    phone: string
    password: string
    newPassword: string
    confirm: string

    city: string
    street: string
    house: number | string
    flat: number | string

    error: null | string
}
type TFields = keyof TForm
type TDesc = {
    title: string
    content?: string | null
}

const validationSchema = Yup.object().shape({
    email: Yup.string().email('E-mail is invalid').required('Field is required'),
    password: Yup.string().min(6, 'Password should be min 6 symbols'),
})

export const ProfileForm: React.FC<TProps> = ({ user, handleClose }) => {
    const [loading, setLoading] = useState<boolean>(false)
    const dispatch = useDispatch()

    const initialValues = {
        name: user.name,
        email: user.email,
        phone: '',
        password: '',
        newPassword: '',
        confirm: '',
        city: '',
        street: '',
        house: '',
        flat: '',
        error: null,
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        validateOnBlur: true,
        onSubmit: async (values: TForm, { resetForm, setErrors }: FormikHelpers<any>) => {
            try {
                setLoading(true)
                // await dispatch(signIn(values.email.trim(), values.password.trim(),
                //     values.rememberMe))
                console.log('submit')
                resetForm()
            } catch (error) {
                setErrors({ error: error.message })
            } finally {
                setLoading(false)
            }
        },
    })

    const validateStatus = (field: TFields) => {
        return (formik.touched[field] && formik.errors[field]) || formik.errors.error ? 'error' : undefined
    }
    const help = (field: TFields) => {
        return (formik.touched[field] && formik.errors[field]) || undefined
    }

    return (
        <>
            <Form name='profile' onFinish={formik.handleSubmit} initialValues={formik.initialValues}>
                <p style={sFont(16)}>Personal</p>
                <Form.Item
                    required
                    valuePropName='name'
                    label='Full Name:'
                    name='name'
                    validateStatus={validateStatus('name')}
                    help={help('name')}>
                    <Input {...formik.getFieldProps('name')} />
                </Form.Item>
                <Form.Item
                    required
                    valuePropName='email'
                    label='E-mail:'
                    name='email'
                    validateStatus={validateStatus('email')}
                    help={help('email')}>
                    <Input {...formik.getFieldProps('email')} />
                </Form.Item>
                <Form.Item
                    valuePropName='phone'
                    label='Phone:'
                    name='phone'
                    validateStatus={validateStatus('phone')}
                    help={help('phone')}>
                    <Input {...formik.getFieldProps('phone')} />
                </Form.Item>
                <Form.Item
                    valuePropName='password'
                    label='Current Password:'
                    name='password'
                    validateStatus={validateStatus('password')}
                    help={help('password')}>
                    <Input {...formik.getFieldProps('password')} />
                </Form.Item>
                <Form.Item
                    valuePropName='newpassword'
                    label='New Password:'
                    name='newPassword'
                    validateStatus={validateStatus('newPassword')}
                    help={help('newPassword')}>
                    <Input {...formik.getFieldProps('newPassword')} />
                </Form.Item>
                <Form.Item
                    valuePropName='confirm'
                    label='Confirm Password:'
                    name='confirm'
                    validateStatus={validateStatus('confirm')}
                    help={help('confirm')}>
                    <Input {...formik.getFieldProps('confirm')} />
                </Form.Item>

                <Divider />

                <p style={sFont(16)}>Address</p>
                <Form.Item
                    valuePropName='city'
                    label='City:'
                    name='city'
                    validateStatus={validateStatus('city')}
                    help={help('city')}>
                    <Input {...formik.getFieldProps('city')} />
                </Form.Item>
                <Form.Item
                    valuePropName='street'
                    label='Street:'
                    name='street'
                    validateStatus={validateStatus('street')}
                    help={help('street')}>
                    <Input {...formik.getFieldProps('street')} />
                </Form.Item>
                <Form.Item
                    valuePropName='house'
                    label='House:'
                    name='house'
                    validateStatus={validateStatus('house')}
                    help={help('house')}>
                    <Input {...formik.getFieldProps('house')} />
                </Form.Item>
                <Form.Item
                    valuePropName='flat'
                    label='Flat:'
                    name='flat'
                    validateStatus={validateStatus('flat')}
                    help={help('flat')}>
                    <Input {...formik.getFieldProps('flat')} />
                </Form.Item>

                <Divider />

                <div style={{ textAlign: 'right' }}>
                    <Button onClick={handleClose} style={{ marginRight: 8 }}>
                        Cancel
                    </Button>
                    <Button htmlType='submit' type='primary'>
                        Submit
                    </Button>
                </div>
            </Form>
        </>
    )
}
