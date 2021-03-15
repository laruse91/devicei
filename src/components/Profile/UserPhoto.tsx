import React, { useState } from 'react'
import { message, Upload } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { UploadChangeParam } from 'antd/es/upload'
import { select } from '../../selectors/selectors'
import { addUserPhoto } from '../../store/auth-reducer'
import ImgCrop from 'antd-img-crop'

const beforeUpload = (file: File | Blob): boolean => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!')
    }
    return isJpgOrPng && isLt2M
}

export const UserPhoto: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const authorizedUser = useSelector(select.authorizedUser)
    const dispatch = useDispatch()

    const handleChange = (info: UploadChangeParam) => {
        setIsLoading(true)
        info.file.originFileObj && dispatch(addUserPhoto(authorizedUser!.userId, info.file.originFileObj as File))
    }

    const uploadButton = (
        <div>
            {isLoading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    )
    return (
        <ImgCrop rotate shape='round'>
            <Upload
                style={{ height: '50px' }}
                name='userPhoto'
                listType='picture-card'
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={handleChange}>
                {authorizedUser?.photoURL ? (
                    <img src={authorizedUser?.photoURL} alt='avatar' style={{ width: '95%', borderRadius: '3px' }} />
                ) : (
                    uploadButton
                )}
            </Upload>
        </ImgCrop>
    )
}
