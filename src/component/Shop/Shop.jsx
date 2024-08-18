import { useEffect, useState } from 'react';
import './Shop.css';
import { useLoaderData } from 'react-router-dom';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import Product from '../../Product/Product';
import Filter from '../Filter/Filter';
import SearchBar from '../SearchBar/SearchBar';
import Sorting from '../Sorting/Sorting';
import { FaFilter } from 'react-icons/fa'; 
import LoadingSpinner from '../../Layout/LoadingSpinner';
const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [filters, setFilters] = useState({ brand: '', category: '', minPrice: 0, maxPrice: Infinity });
    const { count } = useLoaderData();
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const numberOfPages = Math.ceil(count / itemsPerPage);
    // const numberOfPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const pages = [...Array(numberOfPages).keys()];
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState({ field: 'dateAdded', order: 'desc' });
    const [loading, setLoading] = useState(true); // Loading state
    const handleSortChange = (sortValue) => {
        const [field, order] = sortValue.split('-');
        setSortOption({ field, order });
    };
    useEffect(() => {
        setLoading(true);
    
        const { brand, category, minPrice, maxPrice } = filters;

        // Construct the query parameters based on filters
        const queryParams = new URLSearchParams({
            page: currentPage,
            size: itemsPerPage,
            sortField: sortOption.field,
            sortOrder: sortOption.order,
            search: searchQuery,
            brand: brand || '',
            category: category || '',
            minPrice: minPrice || 0,
            maxPrice: maxPrice || Infinity
        });
        fetch(`https://spw-app-server.vercel.app/products?${queryParams.toString()}`)
        // fetch(`https://spw-app-server.vercel.app/products?page=${currentPage}&size=${itemsPerPage}&sortField=${sortOption.field}&sortOrder=${sortOption.order}&search=${searchQuery}&brand=${filters.brand}&category=${filters.category}&minPrice=${filters.minPrice}&maxPrice=${filters.maxPrice}`)
        .then(res => res.json())
        .then(data => {
            setProducts(data.products); // Access products from the response
            
            // Extract categories and brands
            const uniqueCategories = [...new Set(data.products.map(item => item.category))];
            const uniqueBrands = [...new Set(data.products.map(item => item.brand))];
            setCategories(uniqueCategories);
            setBrands(uniqueBrands);

            setFilteredProducts(data.products); // Directly use the filtered products from the backend

            setLoading(false); // Stop loading
        })
        .catch(() => {
            setLoading(false); // Stop loading even if there's an error
        });
    }, [currentPage, itemsPerPage, sortOption, filters, searchQuery]);
    
    // useEffect(() => {
    //     setLoading(true); // Start loading

    //     fetch(`https://spw-app-server.vercel.app/products?page=${currentPage}&size=${itemsPerPage}&sortField=${sortOption.field}&sortOrder=${sortOption.order}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             setProducts(data);
    //             // Extract categories and brands
    //             const uniqueCategories = [...new Set(data.map(item => item.category))];
    //             const uniqueBrands = [...new Set(data.map(item => item.brand))];
    //             setCategories(uniqueCategories);
    //             setBrands(uniqueBrands);
    //             setLoading(false); // Stop loading
    //         })
    //         .catch(() => {
    //             setLoading(false); // Stop loading even if there's an error
    //         });
    // }, [currentPage, itemsPerPage, sortOption]);

    // useEffect(() => {
    //     setLoading(true); // Start loading
    
    //     fetch(`https://spw-app-server.vercel.app/products?page=${currentPage}&size=${itemsPerPage}&sortField=${sortOption.field}&sortOrder=${sortOption.order}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             setProducts(data);
    
    //             // Extract categories and brands
    //             const uniqueCategories = [...new Set(data.map(item => item.category))];
    //             const uniqueBrands = [...new Set(data.map(item => item.brand))];
    //             setCategories(uniqueCategories);
    //             setBrands(uniqueBrands);
    
    //             // Filter products based on the current filters
    //             const filtered = data.filter(product => {
    //                 const title = product.title || ''; // Ensure the name is a string, even if it's undefined
    //                 return (
    //                     (filters.brand ? product.brand === filters.brand : true) &&
    //                     (filters.category ? product.category === filters.category : true) &&
    //                     (product.price >= filters.minPrice && product.price <= filters.maxPrice) &&
    //                     (title.toLowerCase().includes(searchQuery.toLowerCase()))
    //                 );
    //             });
    //             setFilteredProducts(filtered);
    
    //             setLoading(false); // Stop loading
    //         })
    //         .catch(() => {
    //             setLoading(false); // Stop loading even if there's an error
    //         });
    // }, [currentPage, itemsPerPage, sortOption, filters, searchQuery]);
    
    useEffect(() => {
        const storedCart = getShoppingCart();
        const savedCart = [];
        for (const id in storedCart) {
            const addedProduct = products.find(product => product._id === id);
            if (addedProduct) {
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct);
            }
        }
        setCart(savedCart);
    }, [products]);

    useEffect(() => {
        const filtered = products.filter(product => {
            const title = product.title || ''; // Ensure the name is a string, even if it's undefined
            return (
                (filters.brand ? product.brand === filters.brand : true) &&
                (filters.category ? product.category === filters.category : true) &&
                (product.price >= filters.minPrice && product.price <= filters.maxPrice) &&
                (title.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        });
        setFilteredProducts(filtered);
    }, [filters, products, searchQuery]);



    const handleAddToCart = (product) => {
        let newCart = [];
        const exists = cart.find(pd => pd._id === product._id);
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product];
        } else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd._id !== product._id);
            newCart = [...remaining, exists];
        }
        setCart(newCart);
        addToDb(product._id);
    };


    const handleItemsPerPage = e => {
        const val = parseInt(e.target.value);
        setItemsPerPage(val);
        setCurrentPage(0);
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    // const applyFilters = (filterValues) => {
    //     setFilters(filterValues);
    // };
    const applyFilters = (filterValues) => {
        setFilters(filterValues);
        setCurrentPage(0); // Reset to first page when filters are applied
    };
    

    // filter mobile 
    const [isFilterVisible, setIsFilterVisible] = useState(false);

    const toggleFilterVisibility = () => {
        setIsFilterVisible(!isFilterVisible);
    };

    const closeFilter = () => {
        setIsFilterVisible(false);
    };

    // Close the filter when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isFilterVisible && !event.target.closest('.filter-container') && !event.target.closest('.filter-button')) {
                closeFilter();
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isFilterVisible]);




    return (
        <div className='shop-container mx-auto'>

            <div className='flex md:flex-row mt-5 4 flex-col justify-evenly items-center gap-2 mx-auto'>
                <div className='w-full  md:w-1/2 px-4 translate-x-0 md:translate-x-44'>  <SearchBar setSearchQuery={setSearchQuery} /></div>

                <div className='w-full md:w-1/3 text-center md:text-end'>
                    <div className='flex items-center justify-between'>
                        <div>
                            {/* Filter Button for Small Devices */}
                            <div className='md:hidden flex   p-4 justify-center  '>
                                <button
                                    className='filter-button bg-yellow-800 -mt-10 md:mt-0 text-white rounded-md px-4 py-2'
                                    onClick={toggleFilterVisibility}
                                >
                                    {isFilterVisible ? <FaFilter /> : <FaFilter />}
                                </button>
                            </div>
                        </div>
                        <div className='mr-4 md:mr-0'>
                            <Sorting
                                sortOptions={[
                                    { value: 'dateAdded-desc', label: ' Newest First' },
                                    { value: 'price-desc', label: ' High to Low  ' },
                                    { value: 'price-asc', label: ' Low to High' },

                                ]}
                                onSortChange={handleSortChange}
                            />
                        </div>
                    </div>

                </div>
            </div>




            <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mx-auto'>
                {/* Filter Section */}
                <div
                    className={`filter-container col-span-1 grid grid-cols-1 mx-auto ${isFilterVisible ? 'block' : 'hidden'} md:block`}
                >
                    <Filter
                        categories={categories}
                        brands={brands}
                        applyFilters={(filterValues) => {
                            applyFilters(filterValues);
                            closeFilter(); // Close filter after applying
                        }}
                    />
                </div>

                {/* Loading Spinner */}
                {loading ? (
                     
                    <LoadingSpinner></LoadingSpinner>


                ) : (
                    <div className="products-container col-span-3 grid grid-cols-1 md:grid-cols-3 gap-5 mx-auto">
                        {filteredProducts.map(product => (
                            <Product
                                key={product._id}
                                product={product}
                                handleAddToCart={handleAddToCart}
                            />
                        ))}
                    </div>
                )}
                {/* <div className="products-container  col-span-3 grid grid-cols-1 md:grid-cols-3 gap-5 mx-auto">
                    {
                        filteredProducts.map(product => <Product
                            key={product._id}
                            product={product}
                            handleAddToCart={handleAddToCart}
                        ></Product>)
                    }
                </div> */}
            </div>
            <div className='hidden md:block'>
                <div className='pagination rounded-xl'>
                    {/* <p className='text-white'>Current Page : {currentPage}</p> */}
                    <button className='rounded-full px-12 py-6' onClick={handlePrevPage}>Prev</button>

                    {
                        pages.map(page => <button


                            // className= {currentPage === page ? 'selected' : undefined}
                            className={
                                currentPage === page
                                    ? 'bg-red-500 selected text-white rounded-full px-4 py-2 mx-1'  // Active page styling
                                    : 'bg-gray-200 text-gray-800 rounded-full px-4 py-2 mx-1 hover:bg-blue-300' // Default styling
                            }
                            onClick={() => setCurrentPage(page)}
                            key={page}

                        >
                            {page}
                        </button>)
                    }

                    <button className='rounded-full px-12 py-6' onClick={handleNextPage}>Next</button>

                    <select value={itemsPerPage} onChange={handleItemsPerPage} name='' id=''>
                         
                        <option value='10'>10</option>
                        <option value='20'>20</option>
                        <option value='40'>40</option>

                    </select>
                </div>
            </div>

        </div>
    );
};

export default Shop;