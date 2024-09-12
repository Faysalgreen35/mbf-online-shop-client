import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
// import ParticleBackground from "../../component/ParticleBackground/ParticleBackground";
import { useCallback } from "react";
// import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import Particles from "react-tsparticles";

const Main = () => {

    const particlesInit = useCallback(async engine => {
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        console.log(container);
    }, []);

    return (
        <div className="bg-gray-500 dark:bg-gray-800 dark:text-white" >
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div >
          <Navbar />
          </div>
            <div className='bg-gray-500  dark:bg-gray-800 dark:text-white min-h-[calc(100vh-68px)]'>
                <Outlet />
            </div>
            <Footer />
            
            <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                background: {
                    color: {
                        value: "black", 
                        
                    },
                },
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onClick: {
                            enable: true,
                            mode: "push",
                        },
                        onHover: {
                            enable: true,
                            mode: "repulse",
                        },
                        resize: true,
                    },
                    modes: {
                        push: {
                            quantity: 4,
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4,
                        },
                    },
                },
                particles: {
                    color: {
                        value: "#ffffff",
                    },
                    links: {
                        color: "#ffffff",
                        distance: 150,
                        enable: true,
                        opacity: 0.5,
                        width: 1,
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: false,
                        speed: 6,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 800,
                        },
                        value: 80,
                    },
                    opacity: {
                        value: 0.5,
                    },
                    shape: {
                        // type: "circle",
                        type: "star",
                        // type: "polygon",
                    },
                    size: {
                        value: { min: 1, max: 5 },
                    },
                },
                detectRetina: true,
            }}
          />
        </div>
    </div>
    );
};

export default Main;