import { Avatar, Button, Col, Divider, Drawer, Empty, Row, Tooltip, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { TAuthorizedUser } from '../../types/types'
import { sFont } from '../../styles/styles'
import { ProfileForm } from './ProfileForm'
import { AddressForm } from './AddressForm'
import { useDispatch, useSelector } from 'react-redux'
import { select } from '../../selectors/selectors'
import { getUserContacts } from '../../store/auth-reducer'
import { EditOutlined, UserOutlined } from '@ant-design/icons'

const { Text } = Typography

type TProps = {
    isVisible: boolean
    user: TAuthorizedUser
    onClose: () => void
}
type TDesc = {
    title: string
    content?: string | null
    alt?: string
}

const DescriptionItem: React.FC<TDesc> = ({ title, content, alt }) => (
    <div>
        <Text>{title}:</Text>
        {content ? (
            <Text style={{ marginLeft: '20px', color: '#56575de0' }}>{content}</Text>
        ) : (
            <Text type='secondary' style={{ marginLeft: '20px' }}>
                {alt}
            </Text>
        )}
    </div>
)

export const Profile: React.FC<TProps> = ({ isVisible, user, onClose }) => {
    const [profileEditMode, setProfileEditMode] = useState(false)
    const [addressEditMode, setAddressEditMode] = useState(false)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUserContacts(user.userId))
    }, [])

    const contacts = useSelector(select.contacts)

    const handleClick = (form: 'address' | 'profile', value: boolean) => () => {
        form === 'profile' && setProfileEditMode(value)
        form === 'address' && setAddressEditMode(value)
    }
    const handleClose = () => {
        onClose()
        setProfileEditMode(false)
        setAddressEditMode(false)
    }

    let content = (
        <>
            <Row justify='space-between' align='middle'>
                <Row>
                    <p style={{ fontSize: '16px', marginRight: ' 20px' }}>Personal</p>
                    <Tooltip title='Edit Profile'>
                        <Button type='link' size='small' onClick={handleClick('profile', true)} icon={<EditOutlined />}>
                            Edit
                        </Button>
                    </Tooltip>
                </Row>
                <Col span={6}>
                    <Avatar
                        size={50}
                        src={user?.photoURL}
                        style={{ backgroundColor: '#b7e8a2' }}
                        icon={<UserOutlined />}
                    />
                </Col>
            </Row>

            <DescriptionItem title='Full Name' content={user.name} />
            <DescriptionItem title='E-mail' content={user.email} />
            <Divider />
            <Row>
                <p style={{ fontSize: '16px', marginRight: ' 20px' }}>Contacts & Address</p>
                <Tooltip title='Edit Contacts & Address'>
                    <Button type='link' size='small' onClick={handleClick('address', true)} icon={<EditOutlined />}>
                        Edit
                    </Button>
                </Tooltip>
            </Row>
            <DescriptionItem
                title='Phone'
                content={contacts?.phoneNumber && `+7 ${contacts?.phoneNumber}`}
                alt='+7 999 123 45 67'
            />
            <DescriptionItem title='City' content={contacts?.city} alt='Your city' />
            <DescriptionItem title='Street' content={contacts?.street} alt='Your street' />
            <Row gutter={20}>
                <Col span={12}>
                    <DescriptionItem title='House' content={contacts?.house} alt='House' />
                </Col>
                <Col span={12}>
                    <DescriptionItem title='Flat' content={contacts?.flat} alt='Flat' />
                </Col>
            </Row>

            <Divider />

            <p style={sFont(16)}>Orders</p>
            <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={<span> You did not buy in our shop yet :(</span>}
            />
        </>
    )
    if (profileEditMode) {
        content = <ProfileForm user={user} handleClose={handleClick('profile', false)} />
    }
    if (addressEditMode) {
        content = <AddressForm user={user} contacts={contacts} handleClose={handleClick('address', false)} />
    }

    return (
        <>
            <Drawer
                title={user.name || 'My Profile'}
                width={360}
                onClose={handleClose}
                visible={isVisible}
                bodyStyle={{ paddingBottom: 80 }}>
                {content}
            </Drawer>
        </>
    )
}
