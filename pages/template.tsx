import Head from 'next/head';
import React from "react";
import TabProfile from '../components/Tab';

const Page = () => {
    return (
        <>
            <Head>
                <title>KIOTFPT - Smart Ecommerce</title>
                <meta name="description" content="" />
                <meta name="keywords" content="" />
            </Head>
            <div className="w-full flex flex-col justify-center items-center">
                <div className="w-full flex flex-col justify-center items-center mb-5">
                    <div className="w-2/3 flex gap-x-8">
                        <TabProfile />
                        <div className="w-4/5">

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page;
