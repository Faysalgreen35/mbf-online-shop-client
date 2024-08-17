import { useState } from 'react';
import Cart from '../Cart/Cart';
import { Link, useLoaderData } from 'react-router-dom';
// import ReviewItem from '../ReviewItem/ReviewItem';
import './Orders.css';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import ReviewItem from '../ReviewItem/ReviewItem';
import { MdOutlineShoppingCartCheckout } from 'react-icons/md';

const Orders = () => {
    const savedCart = useLoaderData();
    const [cart, setCart] = useState(savedCart);

    const handleRemoveFromCart = (id) => {
        const remaining = cart.filter(product => product._id !== id);
        console.log(cart, id)
        setCart(remaining);
        removeFromDb(id);
    }

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    return (
        <div className='shop-container flex flex-col md:flex-row'>
            <div className='review-container w-full md:w-1/2 px-6'>
                {
                    cart.map(product => <ReviewItem
                        key={product._id}
                        product={product}
                        handleRemoveFromCart={handleRemoveFromCart}
                    ></ReviewItem>)
                }
            </div>
            <div className='cart-container  mr-3  w-full md:w-1/3 px-5 text-sm'>
                <Cart
                    cart={cart}
                    handleClearCart={handleClearCart}
                >
                    <Link className='proceed-link' to="#">
                   
                        <button className='btn-proceed btn-proceed-cart bg-green-500 w-60 md:w-52 px-5 text-sm'>
                             Checkout
                            <MdOutlineShoppingCartCheckout className='  text-3xl' />
                            </button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Orders;