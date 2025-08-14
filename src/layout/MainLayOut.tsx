import Footer from '@/component/Footer/Footer';
import Navbar from '@/component/Navbar/Navbar';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import AOS from 'aos';
import "aos/dist/aos.css";


const MainLayOut = () => {
 const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 800, once: false });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [location]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
    return (
        <div>
            <Navbar />
            <main className='flex flex-col min-h-[calc(100vh-300px)]'>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayOut;



