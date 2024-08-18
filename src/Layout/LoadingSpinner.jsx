 

 

const LoadingSpinner = () => {
    return (
        <div role="status" className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
            <div className="flex items-center justify-center w-full h-screen bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
                <svg className="w-96 h-96 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                </svg>
            </div>
            <div className="w-full">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-5xl mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>
    );
};

export default LoadingSpinner;


// import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';
// // import { ScaleLoader } from 'react-spinners';

// const LoadingSpinner = ({ smallHeight, showSkeleton }) => {
//   return (
//     <div
//       className={` ${smallHeight ? 'h-[250px]' : 'h-[70vh]'}
//       flex 
//       flex-col 
//       justify-center 
//       items-center `}
//     >
//       {showSkeleton ? (
//         <div className="w-full px-4">
//           <Skeleton count={smallHeight ? 1 : 5} height={smallHeight ? 20 : 40} />
//         </div>
//       ) : (
//         <div role="status" className="max-w-6xl ml-0 md:ml-96 mt-16 p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
//         <div className="h-2  bg-gray-400 rounded-full dark:bg-gray-700 w-32 mb-2.5"></div>
//         <div className="w-full md:w-[640px] h-2 mb-10 bg-gray-200 rounded-full dark:bg-gray-700"></div>
//         <div className="flex w-full items-baseline mt-4">
//             <div className="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-700"></div>
//             <div className="w-full h-56 ms-6 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
//             <div className="w-full bg-gray-200 rounded-t-lg h-72 ms-6 dark:bg-gray-700"></div>
//             <div className="w-full h-64 ms-6 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
//             <div className="w-full bg-gray-200 rounded-t-lg h-80 ms-6 dark:bg-gray-700"></div>
//             <div className="w-full bg-gray-200 rounded-t-lg h-72 ms-6 dark:bg-gray-700"></div>
//             <div className="w-full bg-gray-200 rounded-t-lg h-80 ms-6 dark:bg-gray-700"></div>
//         </div>
//         <span className="sr-only">Loading...</span>
//        </div>
//       )}
//     </div>
//   );
// };

// export default LoadingSpinner;
