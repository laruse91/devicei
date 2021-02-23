import React from 'react'
import { Checkbox, Form, FormInstance, Input, Typography } from 'antd'
import { FormikHelpers, useFormik } from 'formik'
import { signIn } from '../../store/auth-reducer'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { sAuthForm } from '../../styles/styles'
const { Text } = Typography

type TProps = {
    form: FormInstance
    setLoading: (loading: boolean) => void
}
type TForm = {
    signIn_email: string
    signIn_password: string
    signIn_rememberMe: boolean
    signIn_error: null | string
}

const validationSchema = Yup.object().shape({
    signIn_email: Yup.string().email('E-mail is invalid').required('Field is required'),
    signIn_password: Yup.string().required('Field is required').min(6, 'Password should be min 6 symbols'),
})
const initialValues = {
    signIn_email: '',
    signIn_password: '',
    signIn_rememberMe: true,
    signIn_error: null,
}

export const SignInForm: React.FC<TProps> = ({ form, setLoading }) => {
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues,
        validationSchema,
        validateOnBlur: true,
        onSubmit: async (values: TForm, { setErrors }: FormikHelpers<any>) => {
            try {
                setLoading(true)
                await dispatch(signIn(values.signIn_email, values.signIn_password, values.signIn_rememberMe))
            } catch (error) {
                setErrors({ signIn_error: error.message })
            } finally {
                setLoading(false)
            }
        },
    })

    return (
        <Form form={form} name='signIn' onFinish={formik.handleSubmit} initialValues={formik.initialValues}>
            <Form.Item
                required
                {...sAuthForm}
                label='E-mail'
                name='email'
                validateStatus={
                    (formik.touched.signIn_email && formik.errors.signIn_email) || formik.errors.signIn_error
                        ? 'error'
                        : undefined
                }
                help={(formik.touched.signIn_email && formik.errors.signIn_email) || undefined}>
                <Input {...formik.getFieldProps('signIn_email')} />
            </Form.Item>

            <Form.Item
                required
                {...sAuthForm}
                label='Password'
                name='password'
                validateStatus={
                    (formik.touched.signIn_password && formik.errors.signIn_password) || formik.errors.signIn_error
                        ? 'error'
                        : undefined
                }
                help={(formik.touched.signIn_password && formik.errors.signIn_password) || undefined}>
                <Input.Password {...formik.getFieldProps('signIn_password')} />
            </Form.Item>

            <Form.Item name='rememberMe' valuePropName='checked' wrapperCol={{ offset: 8, span: 12 }}>
                <Checkbox {...formik.getFieldProps('signIn_rememberMe')}>Remember me</Checkbox>
            </Form.Item>

            <Text style={{ color: 'red' }}>{formik.errors.signIn_error}</Text>
        </Form>
    )
}
