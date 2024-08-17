/* eslint-disable react/prop-types */

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css';

/* eslint-disable react/prop-types */

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Product.css';

const Product = (props) => {
    const { image, title,  rating, price } = props.product;
    const handleAddToCart = props.handleAddToCart;

    // Generate rating stars based on the rating value
    const generateStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <svg
                    key={i}
                    className={`w-4 h-4 ${i <= rating ? 'text-yellow-300' : 'text-gray-200'}`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
            );
        }
        return stars;
    };

    return (
        <div className="w-full max-w-xs bg-white border-8 border-green-700 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 py-2  ">
            <a href="#">
                <img className="w-full h-48 object-fit px-2 rounded-t-lg" src={image} alt="product image" />
            </a>
            <div className="px-4 py-3">
                <a href="#">
                    <h5 className="text-lg font-semibold tracking-tight text-yellow-600 dark:text-white">{title}</h5>
                </a>
                <div className="flex items-center mt-2 mb-4">
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        {generateStars(rating.rate)}
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                            {rating.count}
                        </span>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900 dark:text-white">${price}</span>
                    <a
                        href="#"
                        onClick={() => handleAddToCart(props.product)}
                        className="text-white bg-blue-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-red-700 dark:focus:ring-blue-800"
                    >
                        <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                        Add to Cart
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Product;



// const Product = (props) => {

//     const { image, title, rating, price } = props.product;
//     const handleAddToCart = props.handleAddToCart;


//     return (


//         <div>
//              <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
//             <a href="#"> 
//                 <img className="p-8 rounded-t-lg" src={image} alt="product image" />
//             </a>
//             <div className="px-5 pb-5">
//                 <a href="#">
//                     <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
//                     {title}

//                     </h5>
//                 </a>
//                 <div className="flex items-center mt-2.5 mb-5">
//                     <div className="flex items-center space-x-1 rtl:space-x-reverse">
//                         <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
//                             <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
//                         </svg>
//                         <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
//                             <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
//                         </svg>
//                         <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
//                             <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
//                         </svg>
//                         <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
//                             <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
//                         </svg>
//                         <svg className="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
//                             <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
//                         </svg>
//                     </div>
//                     <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
//                     Rating: {rating.rate}  {rating.count}  
//                     </span>
                    
//                 </div>
//                 <div className="flex items-center justify-between">
//                     <span className="text-xl font-bold text-gray-900 dark:text-white">
//                     <p>Price: ${price}</p>
//                     </span>
//                     <a href="#"
//                     onClick={() => handleAddToCart(props.product)}
//                     className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
//                         Add to cart
//                     </a>
//                 </div>
//             </div>
//         </div>

        
//         {/* // ------------------ */}
//         {/* <div className='product'>
//             <img src={image} alt="" />
//             <div className='product-info'>
//                 <h6 className='product-name'>{title}</h6>
//                 <p>Price: ${price}</p>
//                 <p>Brand: {brand}</p>
//                 <p>Rating: {rating.rate} Stars</p>
//             </div>
//             <button onClick={() => handleAddToCart(props.product)} className='btn-cart'>
//                 Add to Cart
//                 <FontAwesomeIcon className='ml-3' icon={faShoppingCart} />
//                 </button>
//         </div> */}
//         </div>
//     );
// };
// export default Product;
       