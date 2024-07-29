import Header from './Header';
import Footer from './Footer';
import { SemanticToastContainer } from 'react-semantic-toasts';

const Layout = ({ children }: { children: React.ReactNode }) => (
    <div className="w-full flex flex-col justify-center items-center bg-white">
        <Header />
        <main className="w-full flex-col justify-center items-center bg-white">
            <div className='w-full flex flex-col justify-center items-center relative'>
                <div className='w-2/3 flex flex-col justify-center items-center absolute top-0'>
                    <SemanticToastContainer className="w-1/3" />
                </div>
            </div>
            {children}
        </main>
        <Footer />
    </div>
);

export default Layout;