import React, { useState } from 'react'
import { Checkbox, Form, Input, Modal, Tabs } from 'antd'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { signIn, signUp } from '../../store/auth-reducer'

const { TabPane } = Tabs

type TProps = {
    isVisible: boolean
    onCancel: () => void
}
type TSignInForm = {
    signIn_email: string
    signIn_password: string
    signIn_rememberMe: boolean
}
type TSignUpForm = {
    signUp_name: string
    signUp_email: string
    signUp_password: string
    signUp_confirm: string
}

export const AuthForm: React.FC<TProps> = ({ isVisible, onCancel }) => {
    const [tab, setTab] = useState<'signIn' | 'signUp'>('signIn')

    const dispatch = useDispatch()
    const [sInForm] = Form.useForm()
    const [sUpForm] = Form.useForm()
    const sInFormik = useFormik({
        initialValues: {
            signIn_email: '',
            signIn_password: '',
            signIn_rememberMe: true,
        },
        onSubmit: (values: TSignInForm) => {
            dispatch(signIn(values.signIn_email, values.signIn_password))
        },
    })
    const sUpFormik = useFormik({
        initialValues: {
            signUp_name: '',
            signUp_email: '',
            signUp_password: '',
            signUp_confirm: '',
        },
        onSubmit: (values: TSignUpForm) => {
            dispatch(signUp(values.signUp_email, values.signUp_password, values.signUp_name))
        },
    })

    const onFinishFailed = (error: any) => {
        console.log('Failed:', error)
    }

    const formSubmit = () => {
        if (tab === 'signIn') {
            sInForm
                .validateFields()
                .then((values) => {
                    sInForm.resetFields()
                    sUpForm.resetFields()
                    sInFormik.handleSubmit(values)
                })
                .catch((info) => {
                    console.log('Validate Failed:', info)
                })
        }

        if (tab === 'signUp') {
            sUpForm
                .validateFields()
                .then((values) => {
                    sInForm.resetFields()
                    sUpForm.resetFields()
                    sUpFormik.handleSubmit(values)
                })
                .catch((info) => {
                    console.log('Validate Failed:', info)
                })
        }
    }
    const handleTabClick = (key: string) => {
        setTab(key as 'signIn' | 'signUp')
    }

    const style = {
        labelCol: { span: 8 },
        wrapperCol: { span: 12 },
    }

    const signInForm = (
        <Form
            form={sInForm}
            name='signIn'
            onFinish={sInFormik.handleSubmit}
            onFinishFailed={onFinishFailed}
            initialValues={{
                email: sInFormik.values.signIn_email,
                password: sInFormik.values.signIn_password,
                rememberMe: sInFormik.values.signIn_rememberMe,
            }}>
            <Form.Item
                shouldUpdate={(prevValues, nextValues) => prevValues === nextValues && true}
                {...style}
                label='E-mail'
                name='email'
                rules={[{ required: true, message: 'Please input your E-mail!' }]}>
                <Input value={sInFormik.values.signIn_email} onChange={sInFormik.handleChange} />
            </Form.Item>

            <Form.Item
                {...style}
                label='Password'
                name='password'
                rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input.Password value={sInFormik.values.signIn_password} onChange={sInFormik.handleChange} />
            </Form.Item>

            <Form.Item name='rememberMe' valuePropName='checked' wrapperCol={{ offset: 8, span: 12 }}>
                <Checkbox value={sInFormik.values.signIn_rememberMe} onChange={sInFormik.handleChange}>
                    Remember me
                </Checkbox>
            </Form.Item>
        </Form>
    )

    const signUpForm = (
        <Form
            form={sUpForm}
            name='signUp'
            onFinish={sUpFormik.handleSubmit}
            onFinishFailed={onFinishFailed}
            initialValues={{
                firstName: sUpFormik.values.signUp_name,
                email: sUpFormik.values.signUp_email,
                password: sUpFormik.values.signUp_password,
                confirm: sUpFormik.values.signUp_confirm,
            }}>
            <Form.Item
                {...style}
                name='name'
                label='Your Name'
                rules={[{ required: true, message: 'Please input your First Name!', whitespace: true }]}>
                <Input value={sUpFormik.values.signUp_name} onChange={sUpFormik.handleChange} />
            </Form.Item>

            <Form.Item
                {...style}
                label='E-mail'
                name='email'
                rules={[{ required: true, message: 'Please input your E-mail!' }]}>
                <Input value={sUpFormik.values.signUp_email} onChange={sUpFormik.handleChange} />
            </Form.Item>

            <Form.Item
                {...style}
                label='Password'
                name='password'
                rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input.Password value={sUpFormik.values.signUp_password} onChange={sUpFormik.handleChange} />
            </Form.Item>

            <Form.Item
                {...style}
                label='Confirm Password'
                name='confirm'
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve()
                            }
                            return Promise.reject('The entered passwords do not match!')
                        },
                    }),
                ]}>
                <Input.Password />
            </Form.Item>
        </Form>
    )

    return (
        <>
            <Modal title='Authorization' visible={isVisible} okText='Submit' onCancel={onCancel} onOk={formSubmit}>
                <Tabs defaultActiveKey='signIn' centered onChange={handleTabClick}>
                    <TabPane tab='Sign In' key='signIn'>
                        {signInForm}
                    </TabPane>
                    <TabPane tab='Sign Up' key='signUp'>
                        {signUpForm}
                    </TabPane>
                </Tabs>
            </Modal>
        </>
    )
}
