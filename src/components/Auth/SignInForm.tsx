import React from 'react'
import { Checkbox, Form, FormInstance, Input, Typography } from 'antd'
import { FormikHelpers, useFormik } from 'formik'
import { signIn } from '../../store/auth-reducer'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { sAuthForm } from '../../styles/styles'
import { getUserCart } from '../../store/cart-reducer'

const { Text } = Typography

type TProps = {
    form: FormInstance
    setLoading: (loading: boolean) => void
}
type TForm = {
    email: string
    password: string
    rememberMe: boolean
    error: null | string
}
type TFields = keyof TForm

const validationSchema = Yup.object().shape({
    email: Yup.string().email('E-mail is invalid').required('Field is required'),
    password: Yup.string().required('Field is required').min(6, 'Password should be min 6 symbols'),
})
const initialValues = {
    email: '',
    password: '',
    rememberMe: true,
    error: null,
}

export const SignInForm: React.FC<TProps> = ({ form, setLoading }) => {
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues,
        validationSchema,
        validateOnBlur: true,
        onSubmit: async (values: TForm, { resetForm, setErrors }: FormikHelpers<any>) => {
            try {
                setLoading(true)
                await dispatch(signIn(values.email.trim(), values.password.trim(), values.rememberMe))
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
        <Form form={form} name='signIn' onFinish={formik.handleSubmit} initialValues={formik.initialValues}>
            <Form.Item
                required
                {...sAuthForm}
                valuePropName='email'
                label='E-mail'
                name='email'
                validateStatus={validateStatus('email')}
                help={help('email')}>
                <Input {...formik.getFieldProps('email')} />
            </Form.Item>

            <Form.Item
                required
                {...sAuthForm}
                label='Password'
                valuePropName='password'
                name='password'
                validateStatus={validateStatus('password')}
                help={help('password')}>
                <Input.Password {...formik.getFieldProps('password')} />
            </Form.Item>

            <Form.Item name='rememberMe' valuePropName='checked' wrapperCol={{ offset: 8, span: 12 }}>
                <Checkbox {...formik.getFieldProps('rememberMe')}>Remember me</Checkbox>
            </Form.Item>

            <Text style={{ color: 'red' }}>{formik.errors.error}</Text>
        </Form>
    )
}
