import { Button, Divider, Drawer, Empty, Typography } from 'antd'
import React, { useState } from 'react'
import { TAuthorizedUser } from '../../types/types'
import { sFont } from '../../styles/styles'
import { ProfileForm } from './ProfileForm'

const { Text } = Typography

type TProps = {
    isVisible: boolean
    user: TAuthorizedUser
    handleClose: () => void
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
            <Text style={{ marginLeft: '20px', color: '#1d2d8c' }}>{content}</Text>
        ) : (
            <Text type='secondary' style={{ marginLeft: '20px' }}>
                {alt}
            </Text>
        )}
    </div>
)

export const Profile: React.FC<TProps> = ({ isVisible, user, handleClose }) => {
    const [editMode, setEditMode] = useState(false)

    const handleEdit = () => {
        setEditMode(true)
    }
    const handleCloseEdit = () => {
        setEditMode(false)
    }

    const profile = !editMode ? (
        <>
            <p style={sFont(16)}>Personal</p>
            <DescriptionItem title='Full Name' content={user.name} />
            <DescriptionItem title='E-mail' content={user.email} />
            <DescriptionItem title='Phone' alt='+7 999 123 45 67' />
            <DescriptionItem title='Birthday' alt='01 January 1991' />
            <Divider />
            <p style={sFont(16)}>Address</p>
            <DescriptionItem title='City' alt='Your city' />
            <DescriptionItem title='Street' alt='Your city' />
            <DescriptionItem title='House' alt='Number of house' />
            <DescriptionItem title='Flat' alt='Number of flat' />
            <Divider />
            <p style={sFont(16)}>Orders</p>
            <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={<span> You did not buy in our shop yet :(</span>}
            />
            <Divider />
            <div style={{ textAlign: 'right' }}>
                <Button onClick={handleClose} style={{ marginRight: 8 }}>
                    Cancel
                </Button>
                <Button onClick={handleEdit} type='primary'>
                    Edit Profile
                </Button>
            </div>
        </>
    ) : (
        <ProfileForm user={user} handleClose={handleCloseEdit} />
    )

    return (
        <>
            <Drawer
                title={user.name}
                width={360}
                onClose={handleClose}
                visible={isVisible}
                bodyStyle={{ paddingBottom: 80 }}>
                {profile}
            </Drawer>
        </>
    )
}
