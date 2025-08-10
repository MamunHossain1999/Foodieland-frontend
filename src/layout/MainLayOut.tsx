import Footer from '@/component/Footer/Footer';
import Navbar from '@/component/Navbar/Navbar';
import { Outlet } from 'react-router';


const MainLayOut = () => {
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