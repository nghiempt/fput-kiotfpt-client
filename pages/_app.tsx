import 'semantic-ui-css/semantic.min.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import AOS from 'aos';
import ThemeRegistry from '../theme/theme-registry';
import { GoogleAnalytics } from '@next/third-parties/google';

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        AOS.init({
            duration: 1200,
        });
    }, []);
    return (
        <>
            <GoogleAnalytics gaId="G-HG7FNR03GR" />
            <ThemeRegistry>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ThemeRegistry>
        </>
    );
}

export default MyApp;
