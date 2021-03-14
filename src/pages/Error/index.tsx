import React from 'react'
import { Button, Result } from 'antd'
import { ResultStatusType } from 'antd/es/result'
import { Link } from 'react-router-dom'

type TProps = {
    err?: ResultStatusType
}

const Error: React.FC<TProps> = ({ err = 404 }) => {
    const message = err === 404
        ? 'Sorry, the page you visited does not exist.'
        : 'Sorry, something went wrong.'

    return (
        <>
            <Result
                status={err}
                title={err}
                subTitle={message}
                extra={<Link to='/home'><Button type='primary'>Back Home</Button></Link>}
            />
        </>
    )
}

export default Error