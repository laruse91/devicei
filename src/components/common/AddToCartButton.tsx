import React from 'react'
import { Button } from 'antd'
import { TCart } from '../../types/types'
import { addProductToCart, updateQuantity } from '../../store/cart-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { select } from '../../selectors/selectors'
import { SizeType } from 'antd/es/config-provider/SizeContext'
import { Link } from 'react-router-dom'

type TProps = {
    id: string
    name: string
    category: string
    quantity?: number
    image: string | null
    price: number
    size?: SizeType
    type?: 'text' | 'link' | 'ghost' | 'default' | 'primary' | 'dashed'
}

export const AddToCartButton: React.FC<TProps> = React.memo(
    ({ category, id, name, quantity = 1, image, price, size = 'small' }) => {
        const authorizedUser = useSelector(select.authorizedUser)
        const cartGoods = useSelector(select.cartGoods)
        const dispatch = useDispatch()

        const added = cartGoods.filter((p) => p.id === id)[0]

        const handleAddToCart = () => {
            const cart: TCart = {
                id: id,
                name: name,
                quantity: 1,
                image: image,
                price: price,
                category: category
            }
            dispatch(addProductToCart(authorizedUser?.userId, cart))
        }
        const handleAddOneMore = () => {
            dispatch(updateQuantity(authorizedUser?.userId, id, added.quantity + 1))
        }

        return (
            <>
                {added ? (
                    <>
                        <Link to={'/cart'}>
                            <Button shape='round' size={size}>
                                {added ? `${added.quantity} IN CART` : 'ADD TO CART'}
                            </Button>
                        </Link>

                        <Button
                            type='primary'
                            shape='circle'
                            size={size}
                            onClick={handleAddOneMore}
                            style={{ marginLeft: '5px' }}>
                            +1
                        </Button>
                    </>
                ) : (
                    <Button shape='round' size={size} onClick={handleAddToCart}>
                        ADD TO CART
                    </Button>
                )}
            </>
        )
    }
)
