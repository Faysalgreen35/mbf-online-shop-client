/* eslint-disable react/prop-types */

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import './ReviewItem.css';

const ReviewItem = ({ product, handleRemoveFromCart }) => {
    const { _id, image, price, title, quantity } = product;
    return (
        <div className='review-item'>
            <img src={image} alt="" />
            <div className='review-details'>
                <p className='product-name'>{title}</p>
                <p>Price: <span className='orange-text'>${price}</span></p>
                <p>Order Quantity: <span className='orange-text'>{quantity}</span></p>
            </div>
            <button onClick={() => handleRemoveFromCart(_id)} className='btn-delete'>
                <FontAwesomeIcon className='delete-icon' icon={faTrashAlt} />
            </button>
        </div>
    );
};

export default ReviewItem;