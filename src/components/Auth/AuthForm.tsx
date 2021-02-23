import React, { useState } from 'react'
import { Form, Modal, Tabs } from 'antd'
import { useSelector } from 'react-redux'
import { signIn, signUp } from '../../store/auth-reducer'
import { select } from '../../selectors/selectors'
import { SignInForm } from './SignInForm'
import { SignUpForm } from './SignUpForm'

const { TabPane } = Tabs

type TProps = {
    isVisible: boolean
    handleCancel: () => void
}

export const AuthForm: React.FC<TProps> = ({ isVisible, handleCancel }) => {
    const [tab, setTab] = useState<'signIn' | 'signUp'>('signIn')
    const [loading, setLoading] = useState<boolean>(false)

    const [sInForm] = Form.useForm()
    const [sUpForm] = Form.useForm()

    const formSubmit = () => {
        if (tab === 'signIn') {
            sInForm.submit()
        }
        if (tab === 'signUp') {
            sUpForm.submit()
        }
    }
    const handleTabClick = (key: string) => {
        setTab(key as 'signIn' | 'signUp')
    }

    return (
        <>
            <Modal
                title='Authorization'
                visible={isVisible}
                okText='Submit'
                onCancel={handleCancel}
                onOk={formSubmit}
                confirmLoading={loading}>
                <Tabs defaultActiveKey='signIn' centered onChange={handleTabClick}>
                    <TabPane tab='Sign In' key='signIn'>
                        <SignInForm form={sInForm} setLoading={setLoading} />
                    </TabPane>

                    <TabPane tab='Sign Up' key='signUp'>
                        <SignUpForm form={sUpForm} setLoading={setLoading} />
                    </TabPane>
                </Tabs>
            </Modal>
        </>
    )
}
