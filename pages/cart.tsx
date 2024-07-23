import Head from 'next/head';
import React, { useEffect, useState } from 'react'
import CardProduct from '../components/Product';
import { ShopService } from '../service/shop';
import { CartService } from '../service/cart';

const Page = () => {

    const [products, setProducts] = useState([] as any);
    const [cart, setCart] = useState([] as any);

    useEffect(() => {
        const fetch = async () => {
            try {
                const [
                    car,
                    pros,
                ] = await Promise.all([
                    CartService.getCart(),
                    ShopService.getProductByShop("10", "all", 1, 12)
                ]);
                if (car?.result) {
                    console.log("cart", car?.data);
                    setCart(car?.data);
                }
                if (pros?.result) {
                    setProducts(pros?.data?.products);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetch();
    }, []);

    return (
        <>
            <Head>
                <title>KIOTFPT - Smart Ecommerce</title>
                <meta name="description" content="" />
                <meta name="keywords" content="" />
            </Head>
            <div className="w-full flex flex-col justify-center items-center">
                <section className="w-2/3 antialiased mt-4">
                    <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                        <div className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Shopping Cart</div>
                        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                                <div className="space-y-6">
                                    {
                                        cart?.map((section: any, index: any) => {
                                            return (
                                                <div key={index} className='w-full mb-10'>
                                                    <div className='flex justify-start items-center gap-4 mb-2'>
                                                        <div className='border p-2 rounded-md'>
                                                            <img src={section?.shop?.thumbnail} alt="" className='w-10 h-10' />
                                                        </div>
                                                        <div className='text-[18px] font-medium'>{section?.shop?.name}</div>
                                                    </div>
                                                    <div className='w-full flex flex-col justify-center items-center gap-4'>
                                                        {
                                                            section?.items?.map((item: any, ind: any) => {
                                                                return (
                                                                    <div key={ind} className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                                                                        <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                                                            <a href="#" className="shrink-0 md:order-1">
                                                                                <img className="h-20 w-20 dark:hidden" src={item?.product?.thumbnail[0]?.link} alt="imac image" />
                                                                            </a>
                                                                            <label className="sr-only">Choose quantity:</label>
                                                                            <div className="flex items-center justify-between md:order-3 md:justify-end">
                                                                                <div className="flex items-center">
                                                                                    <button type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                                                                                        <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                                                                                        </svg>
                                                                                    </button>
                                                                                    <input type="text" id="counter-input" data-input-counter className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white" placeholder="" value={item?.quantity} required />
                                                                                    <button type="button" id="increment-button" data-input-counter-increment="counter-input" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                                                                                        <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                                                                                        </svg>
                                                                                    </button>
                                                                                </div>
                                                                                <div className="text-end md:order-4 md:w-32">
                                                                                    <p className="text-base font-bold text-gray-900 dark:text-white">${item?.total}</p>
                                                                                </div>
                                                                            </div>
                                                                            <div className="w-full min-w-0 flex-1 space-y-2 md:order-2 md:max-w-md">
                                                                                <a href="#" className="text-base font-medium text-gray-900 hover:underline dark:text-white">{item?.product?.name}</a>
                                                                                <div>Variant: <strong>{item?.variant?.color?.value} | {item?.variant?.size?.value}</strong></div>
                                                                                <div className="flex items-center gap-4">
                                                                                    <button type="button" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white">
                                                                                        <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                                                                                        </svg>
                                                                                        Add to Favorites
                                                                                    </button>
                                                                                    <button type="button" className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                                                                                        <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                                                                        </svg>
                                                                                        Remove
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                                <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                                    <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <dl className="flex items-center justify-between gap-4">
                                                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                                                <dd className="text-base font-medium text-gray-900 dark:text-white">$7,592.00</dd>
                                            </dl>
                                            <dl className="flex items-center justify-between gap-4">
                                                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                                                <dd className="text-base font-medium text-green-600">-$0</dd>
                                            </dl>
                                            <dl className="flex items-center justify-between gap-4">
                                                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                                                <dd className="text-base font-medium text-gray-900 dark:text-white">$0</dd>
                                            </dl>
                                        </div>
                                        <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                                            <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                                            <dd className="text-base font-bold text-gray-900 dark:text-white">$8,191.00</dd>
                                        </dl>
                                    </div>
                                    <div className="flex items-center justify-center gap-2">
                                        <a href="#" title="" className="inline-flex mt-10 items-center gap-2 text-[16px] font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
                                            Continue Shopping
                                            <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full my-10">
                            <div className="">
                                <h1 className="font-black text-2xl mb-4 text-gray-700">
                                    Related Products
                                </h1>
                                <div className="grid grid-cols-5 gap-x-4">
                                    {products?.slice(0, 5)?.map((item: any, index: any) => {
                                        return <div key={index}>
                                            <CardProduct item={item} index={index} limit={100} />
                                        </div>;
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Page;
