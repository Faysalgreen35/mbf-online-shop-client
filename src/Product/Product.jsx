/* eslint-disable react/prop-types */

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css';

const Product = (props) => {

    const { image, title, brand, rating, price } = props.product;
    const handleAddToCart = props.handleAddToCart;


    return (
        <div className='product'>
            <img src={image} alt="" />
            <div className='product-info'>
                <h6 className='product-name'>{title}</h6>
                <p>Price: ${price}</p>
                <p>Manufacturer: {brand}</p>
                <p>Rating: {rating.rate} Stars</p>
            </div>
            <button onClick={() => handleAddToCart(props.product)} className='btn-cart'>
                Add to Cart
                <FontAwesomeIcon className='ml-3' icon={faShoppingCart} />
                </button>
        </div>
    );
};

export default Product;