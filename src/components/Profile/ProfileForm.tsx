import React, { useState } from 'react'
import { Button, Divider, Form, Input, message, Row } from 'antd'
import { useDispatch } from 'react-redux'
import { FormikHelpers, useFormik } from 'formik'
import { sFont } from '../../styles/styles'
import { TAuthorizedUser } from '../../types/types'
import { UserPhoto } from './UserPhoto'
import * as Yup from 'yup'
import { updateUserProfile } from '../../store/auth-reducer'

type TProps = {
    user: TAuthorizedUser
    handleClose: () => void
}

type TForm = {
    userName: string
    email: string

    error: null | string
}
type TFields = keyof TForm

const validationSchema = Yup.object().shape({
    userName: Yup.string().required('Field is required').min(3, 'Name should be min 3 symbols'),
    email: Yup.string().email('E-mail is invalid').required('Field is required'),
})

export const ProfileForm: React.FC<TProps> = ({ user, handleClose }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const dispatch = useDispatch()

    const initialValues = {
        userName: user.name as string,
        email: user.email as string,

        error: null,
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        validateOnBlur: true,
        onSubmit: async (values: TForm, { setErrors }: FormikHelpers<any>) => {
            try {
                setIsLoading(true)
                await dispatch(updateUserProfile(values.userName, undefined))
                message.success('Profile updated')
                setTimeout(() => handleClose(), 500)
            } catch (error) {
                setErrors({ error: error.message })
            } finally {
                setIsLoading(false)
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
            <Row justify='space-between' align='middle'>
                <div>
                    <p style={sFont(16)}>Personal</p>
                </div>
                <div>
                    <UserPhoto />
                </div>
            </Row>

            <Form name='profile' onFinish={formik.handleSubmit} initialValues={formik.initialValues}>
                <Form.Item
                    required
                    valuePropName='username'
                    label='Full Name:'
                    name='userName'
                    validateStatus={validateStatus('userName')}
                    help={help('userName')}>
                    <Input {...formik.getFieldProps('userName')} />
                </Form.Item>
                <Form.Item
                    required
                    valuePropName='email'
                    label='E-mail:'
                    name='email'
                    validateStatus={validateStatus('email')}
                    help={help('email')}>
                    <Input disabled {...formik.getFieldProps('email')} />
                </Form.Item>
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
        </>
    )
}
