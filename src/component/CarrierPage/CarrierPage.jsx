
import video from '../../assets/carrier.mp4'
const CarrierPage = () => {
    return (
        <div className='dark:bg-gray-800 dark:text-white min-h-screen'>
        {/* Banner Section with Video Background */}
        <section className='relative h-[calc(100vh-368px)] md:h-[calc(100vh-268px)]'>
          <video
            className='absolute inset-0 w-full h-full object-cover'
            autoPlay
            muted
            loop
          >
            <source src= {video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className='relative z-10 flex items-center justify-center h-full'>
            <h1 className='text-white text-3xl md:text-7xl font-bold'>CAREER</h1>
          </div>
        </section>
  
        {/* Content Section */}
        <section className='bg-white text-gray-800 flex items-center justify-center h-auto md:min-h-[calc(100vh-368px)] pt-10'>
          <div className='text-center'>
           <div className='  border-2 border-gray-200 px-10 md:px-72 py-9 md:py-12 mb-6'>
           <h2 className='text-2xl font-bold hidden md:block'>We currently have no vacancies.</h2>
           <h2 className='text-2xl font-mono font-bold md:hidden'>We currently have no <br /> vacancies.</h2>
           </div>
          </div>
        </section>
      </div>
    );
};

export default CarrierPage;