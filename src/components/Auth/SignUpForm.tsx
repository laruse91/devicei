import React from 'react'
import { Form, FormInstance, Input, Typography } from 'antd'
import { FormikHelpers, useFormik } from 'formik'
import { signUp } from '../../store/auth-reducer'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { sAuthForm } from '../../styles/styles'
const { Text } = Typography

type TProps = {
    form: FormInstance
    setLoading: (loading: boolean) => void
}
type TForm = {
    signUp_name: string
    signUp_email: string
    signUp_password: string
    signUp_confirm: string
    signUp_error: null | string
}

const validationSchema = Yup.object().shape({
    signUp_name: Yup.string().required('Field is required').min(3, 'Name should be min 3 symbols'),
    signUp_email: Yup.string().email('E-mail is invalid').required('Field is required'),
    signUp_password: Yup.string().required('Field is required').min(6, 'Password should be min 6 symbols'),
    signUp_confirm: Yup.string()
        .required('Field is required')
        .test('passwords-match', 'Passwords must match', function (value) {
            return this.parent.signUp_password === value
        }),
})
const initialValues = {
    signUp_name: '',
    signUp_email: '',
    signUp_password: '',
    signUp_confirm: '',
    signUp_error: null,
}

export const SignUpForm: React.FC<TProps> = ({ form, setLoading }) => {
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues,
        validationSchema,
        validateOnBlur: true,
        onSubmit: async (values: TForm, { setErrors }: FormikHelpers<any>) => {
            try {
                setLoading(true)
                await dispatch(signUp(values.signUp_email, values.signUp_password, values.signUp_name))
            } catch (error) {
                console.log(error)
                setErrors({ signUp_error: error.message })
            } finally {
                setLoading(false)
            }
        },
    })

    return (
        <Form form={form} name='signUp' onFinish={formik.handleSubmit} initialValues={formik.initialValues}>
            <Form.Item
                required
                name='name'
                label='Your Name'
                {...sAuthForm}
                validateStatus={
                    (formik.touched.signUp_name && formik.errors.signUp_name) || formik.errors.signUp_error
                        ? 'error'
                        : undefined
                }
                help={(formik.touched.signUp_name && formik.errors.signUp_name) || undefined}>
                <Input {...formik.getFieldProps('signUp_name')} />
            </Form.Item>

            <Form.Item
                required
                label='E-mail'
                name='email'
                {...sAuthForm}
                validateStatus={
                    (formik.touched.signUp_email && formik.errors.signUp_email) || formik.errors.signUp_error
                        ? 'error'
                        : undefined
                }
                help={(formik.touched.signUp_email && formik.errors.signUp_email) || undefined}>
                <Input {...formik.getFieldProps('signUp_email')} />
            </Form.Item>

            <Form.Item
                required
                label='Password'
                name='password'
                {...sAuthForm}
                validateStatus={
                    (formik.touched.signUp_password && formik.errors.signUp_password) || formik.errors.signUp_error
                        ? 'error'
                        : undefined
                }
                help={(formik.touched.signUp_password && formik.errors.signUp_password) || undefined}>
                <Input.Password {...formik.getFieldProps('signUp_password')} />
            </Form.Item>

            <Form.Item
                required
                label='Confirm Password'
                name='confirm'
                {...sAuthForm}
                dependencies={['password']}
                hasFeedback
                validateStatus={
                    (formik.touched.signUp_confirm && formik.errors.signUp_confirm) || formik.errors.signUp_error
                        ? 'error'
                        : undefined
                }
                help={(formik.touched.signUp_confirm && formik.errors.signUp_confirm) || undefined}>
                <Input.Password {...formik.getFieldProps('signUp_confirm')} />
            </Form.Item>

            <Text style={{ color: 'red' }}>{formik.errors.signUp_error}</Text>
        </Form>
    )
}
