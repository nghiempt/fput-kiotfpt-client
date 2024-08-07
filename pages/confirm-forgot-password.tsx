import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

const Page = () => {

    const router = useRouter();

    const directToHomePage = () => {
        router.push('/');
    }

    const init = async () => {
        const res = await fetch(`https://api.kiotfpt.store/v1/auth/confirm-forgot-password?newPassword=${router?.query?.newPassword}&username=${router?.query?.email}`)
    }

    useEffect(() => {
        if (router?.query?.email && router?.query?.newPassword) {
            init();
        }
    }, [router]);

    return (
        <>
            <Head>
                <title>KIOTFPT - Smart Ecommerce</title>
                <meta name="description" content="" />
                <meta name="keywords" content="" />
            </Head>
            <div className="w-full min-h-screen flex flex-col justify-start items-center pt-32">
                <div className="flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-sm w-full">
                        <div className="flex justify-center mb-4">
                            <div className="bg-blue-100 p-4 rounded-full relative">
                                <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-200 opacity-75"></div>
                                </div>
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold mb-2">New Password Changed!</h2>
                        <p className="text-gray-600 mb-6">You have changed your new password in your email. Please use it to log in again and continue using the service.</p>
                        <div className="flex justify-center space-x-4">
                            <button onClick={directToHomePage} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:font-bold">Back to home page</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page;
