import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }: { children: React.ReactNode }) => (
    <div className="w-full flex flex-col justify-center items-center bg-white">
        <Header />
        <main className="w-full flex-col justify-center items-center bg-white">
            {children}
        </main>
        <Footer />
    </div>
);

export default Layout;