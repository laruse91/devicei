import { Row } from 'antd'
import React from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'

type TProps = {
    tags: [string, string]
}

export const TagLinks: React.FC<TProps> = ({ tags }) => {
    return (
        <Row justify='center' align='middle'>
            <Link style={{ marginRight: '5px' }} to={`/shop/${tags[0]}`} onClick={() => {}}>
                {tags[0]},
            </Link>

            <Link to={`/shop?brand=${tags[1]}`}>{tags[1]}</Link>
        </Row>
    )
}
