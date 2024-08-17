/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
import { useState } from 'react';

const Filter = ({ categories, brands, handleFilterChange, applyFilters }) => {
    const [localFilters, setLocalFilters] = useState({ brand: '', category: '', minPrice: '', maxPrice: '' });

    const handleChange = (field, value) => {
        setLocalFilters(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleApplyFilters = () => {
        applyFilters({
            brand: localFilters.brand,
            category: localFilters.category,
            minPrice: parseFloat(localFilters.minPrice) || 0,
            maxPrice: parseFloat(localFilters.maxPrice) || Infinity
        });
    };

    return (
        <div className="filter-container p-4 bg-red-200 rounded-lg min-h-screen dark:bg-slate-500 dark:text-white">
            <h2 className="text-xl font-bold mb-4">Filter Products</h2>

            {/* Brand Name Filter */}
            <div className="mb-4">
                <label className="block text-gray-700 dark:text-white ">Brand Name</label>
                <select 
                    value={localFilters.brand}
                    onChange={e => handleChange('brand', e.target.value)} 
                    className="w-full p-2 rounded-md  bg-white dark:bg-black dark:text-white"
                >
                    <option value="">All Brands</option>
                    {brands.map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                    ))}
                </select>
            </div>

            {/* Category Name Filter */}
            <div className="mb-4">
                <label className="block text-gray-700 dark:text-white">Category Name</label>
                <select 
                    value={localFilters.category}
                    onChange={e => handleChange('category', e.target.value)} 
                    className="w-full p-2 rounded-md bg-white dark:bg-black dark:text-white"
                >
                    <option className=' dark:bg-black dark:text-white' value="">All Categories</option>
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>

            {/* Price Range Filter */}
            <div className="mb-4">
                <label className="block text-gray-700 dark:text-white">Price Range</label>
                <input 
                    type="number" 
                    placeholder="Min Price" 
                    value={localFilters.minPrice}
                    onChange={e => handleChange('minPrice', e.target.value)} 
                    className="w-full p-2 mb-2 rounded-md  bg-white dark:bg-black dark:text-white"
                />
                <input 
                    type="number" 
                    placeholder="Max Price" 
                    value={localFilters.maxPrice}
                    onChange={e => handleChange('maxPrice', e.target.value)} 
                    className="w-full p-2 rounded-md  bg-white dark:bg-black dark:text-white"
                />
            </div>

            {/* Apply Filters Button */}
            <button 
                onClick={handleApplyFilters} 
                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
                Apply Filters
            </button>
        </div>
    );
};

export default Filter;
 