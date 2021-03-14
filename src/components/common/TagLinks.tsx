import { Row } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

type TProps = {
    tags: [string, string]
}

export const TagLinks: React.FC<TProps> = ({ tags }) => {
    return (
        <Row justify='center' align='middle'>
            <Link to={`/shop/${tags[0]}`} style={{ marginRight: '5px' }}>{tags[0]},</Link>
            <Link to={`/shop?brand=${tags[1]}`}>{tags[1]}</Link>
        </Row>
    )
}
