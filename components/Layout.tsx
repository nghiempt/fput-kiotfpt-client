import Header from './Header';
import Footer from './Footer';
import { SemanticToastContainer } from 'react-semantic-toasts';

const Layout = ({ children }: { children: React.ReactNode }) => (
    <div className="w-full flex flex-col justify-center items-center bg-white">
        <Header />
        <main className="w-full flex-col justify-center items-center bg-white">
            <div className='w-full flex flex-col justify-center items-center'>
                <div className='w-2/3 flex flex-col justify-center items-center'>
                    <SemanticToastContainer className="w-full" />
                </div>
            </div>
            {children}
        </main>
        <Footer />
    </div>
);

export default Layout;