import Head from 'next/head';
import TabProfile from '../../components/Tab';
import React, { useEffect, useState } from "react";
import { ProfileService } from "../../service/profile";
import Loading from '../../components/Loading';
import CardProduct from '../../components/Product';

const Page = () => {

    const [products, setProducts] = useState([]);

    const init = async () => {
        const prof = await ProfileService.getAllFavourite();
        if (prof?.result) {
            setProducts(prof?.data);
        } else {
            return
        }
    }

    useEffect(() => {
        init()
    }, []);

    useEffect(() => { }, [products]);

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
                            <div className="w-full box-border pb-32">
                                <h1 className="font-semibold text-[20px] py-4">Wishlist Product ({products?.length})</h1>
                                <div className="w-full rounded-md grid grid-cols-4 gap-4">
                                    {
                                        products?.length === 0
                                            ?
                                            <div className="w-full py-16 flex justify-center items-center">
                                                <Loading />
                                            </div>
                                            :
                                            products?.map((item: any, index: any) => {
                                                return (
                                                    <CardProduct key={index} item={item?.product} index={index} limit={20} wishlist={item?.id} init={init} />
                                                );
                                            })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page;
