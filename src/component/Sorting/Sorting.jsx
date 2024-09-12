/* eslint-disable react/prop-types */
 

const Sorting = ({ sortOptions, onSortChange }) => {
    return (
        <div className="sorting-container max-w-md mx-auto mb-4 flex items-center justify-center md:justify-end -mt-7">
            <label htmlFor="sort" className="block  text-yellow-200 text-m font-medium  dark:text-white mr-3 uppercase">
                Sort By:
            </label>
            <select
                id="sort"
                className="block md:w-36 p-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => onSortChange(e.target.value)}
            >
                {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Sorting;
