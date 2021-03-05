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
    name: string
    email: string
    password: string
    confirm: string
    error: null | string
}
type TFields = keyof TForm

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Field is required').min(3, 'Name should be min 3 symbols'),
    email: Yup.string().email('E-mail is invalid').required('Field is required'),
    password: Yup.string().required('Field is required').min(6, 'Password should be min 6 symbols'),
    confirm: Yup.string()
        .required('Field is required')
        .test('passwords-match', 'Passwords must match', function (value) {
            return this.parent.password === value
        }),
})
const initialValues = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: null,
}

export const SignUpForm: React.FC<TProps> = ({ form, setLoading }) => {
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues,
        validationSchema,
        validateOnBlur: true,
        onSubmit: async (values: TForm, { setErrors, resetForm }: FormikHelpers<any>) => {
            try {
                setLoading(true)
                await dispatch(signUp(values.email.trim(), values.password.trim(), values.name.trim()))
                resetForm()
            } catch (error) {
                console.log(error)
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
        <Form form={form} name='signUp' onFinish={formik.handleSubmit} initialValues={formik.initialValues}>
            <Form.Item
                required
                name='ame'
                valuePropName='username'
                label='Your Name'
                {...sAuthForm}
                validateStatus={validateStatus('name')}
                help={help('name')}>
                <Input {...formik.getFieldProps('name')} />
            </Form.Item>

            <Form.Item
                required
                label='E-mail'
                valuePropName='email'
                name='email'
                {...sAuthForm}
                validateStatus={validateStatus('email')}
                help={help('email')}>
                <Input {...formik.getFieldProps('email')} />
            </Form.Item>

            <Form.Item
                required
                label='Password'
                name='password'
                valuePropName='password'
                {...sAuthForm}
                validateStatus={validateStatus('password')}
                help={help('password')}>
                <Input.Password {...formik.getFieldProps('password')} />
            </Form.Item>

            <Form.Item
                required
                label='Confirm Password'
                name='confirm'
                valuePropName='confirm'
                {...sAuthForm}
                dependencies={['password']}
                hasFeedback
                validateStatus={validateStatus('confirm')}
                help={help('confirm')}>
                <Input.Password {...formik.getFieldProps('confirm')} />
            </Form.Item>

            <Text style={{ color: 'red' }}>{formik.errors.error}</Text>
        </Form>
    )
}
