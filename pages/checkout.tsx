import Head from 'next/head';
import React, { useEffect, useState } from 'react'
import { CartService } from '../service/cart';
import { Button, Icon } from 'semantic-ui-react';

const Page = () => {

    const [cart, setCart] = useState([] as any);

    useEffect(() => {
        const fetch = async () => {
            try {
                const [
                    car,
                ] = await Promise.all([
                    CartService.getCart(),
                ]);
                if (car?.result) {
                    console.log("cart", car?.data);
                    setCart(car?.data);
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
                <section className="w-2/3 bg-white pt-6 pb-20 antialiased dark:bg-gray-900">
                    <div className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Checkout</div>
                    <form action="#" className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                        <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
                            <div className="min-w-0 flex-1 space-y-8">
                                <div className='grid grid-cols-2 gap-10'>
                                    <div className="">
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Payment</h3>
                                        <div className="">
                                            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                                                <div className="flex items-start">
                                                    <div className="flex h-5 items-center">
                                                        <input id="pay-on-delivery" aria-describedby="pay-on-delivery-text" type="radio" name="payment-method" value="" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                                                    </div>
                                                    <div className="ms-4 text-sm">
                                                        <label className="font-medium leading-none text-gray-900 dark:text-white"> Payment on delivery </label>
                                                        <p id="pay-on-delivery-text" className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">+$15 payment processing fee</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="">
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Delivery Methods</h3>
                                        <div className="">
                                            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                                                <div className="flex items-start">
                                                    <div className="flex h-5 items-center">
                                                        <input id="fedex" aria-describedby="fedex-text" type="radio" name="delivery-method" value="" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                                                    </div>
                                                    <div className="ms-4 text-sm">
                                                        <label className="font-medium leading-none text-gray-900 dark:text-white">Free Delivery</label>
                                                        <p id="fedex-text" className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">Get it by Friday, 24 Jul 2024</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full'>
                                    <div className="w-full">
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Address Delivery</h3>
                                        <div className="">
                                            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                                                <div className="flex justify-between items-center">
                                                    <div className='flex'>
                                                        <div className="flex h-5 items-center">
                                                            <input id="pay-on-delivery" aria-describedby="pay-on-delivery-text" type="radio" name="payment-method" value="" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                                                        </div>
                                                        <div className="ms-4 text-sm">
                                                            <label className="font-medium leading-none text-gray-900 dark:text-white">Default</label>
                                                            <p id="pay-on-delivery-text" className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">133, Nguyen Van Cu, Ninh Kieu, Can Tho, Vietnam</p>
                                                        </div>
                                                    </div>
                                                    <Icon size='large' name='sync alternate'></Icon>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Products</h3>
                                    <div>
                                        <div className='w-full flex flex-col justify-center items-center gap-4'>
                                            {
                                                cart[1]?.items?.map((item: any, ind: any) => {
                                                    return (
                                                        <div key={ind} className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                                                            <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                                                <a href="#" className="shrink-0 md:order-1">
                                                                    <img className="h-20 w-20 dark:hidden" src={item?.product?.thumbnail[0]?.link} alt="imac image" />
                                                                </a>
                                                                <label className="sr-only">Choose quantity:</label>
                                                                <div className="flex items-center justify-between md:order-3 md:justify-end">
                                                                    <div className="flex items-center">
                                                                        <p className="text-base font-bold text-gray-900 dark:text-white">{item?.quantity} items</p>
                                                                    </div>
                                                                    <div className="text-end md:order-4 md:w-32">
                                                                        <p className="text-base font-bold text-gray-900 dark:text-white">${item?.total}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="w-full min-w-0 flex-1 space-y-2 md:order-2 md:max-w-md">
                                                                    <a href="#" className="text-base font-medium text-gray-900 hover:underline dark:text-white">{item?.product?.name}</a>
                                                                    <div>Variant: <strong>{item?.variant?.color?.value} | {item?.variant?.size?.value}</strong></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Apply Voucher</h3>
                                    <Button primary className='!m-0'>List vouchers</Button>
                                </div>
                                <div className="flow-root">
                                    <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                                        <dl className="flex items-center justify-between gap-4 py-3">
                                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Subtotal</dt>
                                            <dd className="text-base font-medium text-gray-900 dark:text-white">$8,094.00</dd>
                                        </dl>

                                        <dl className="flex items-center justify-between gap-4 py-3">
                                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                                            <dd className="text-base font-medium text-green-500">0</dd>
                                        </dl>

                                        <dl className="flex items-center justify-between gap-4 py-3">
                                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Voucher</dt>
                                            <dd className="text-base font-medium text-gray-900 dark:text-white">$99</dd>
                                        </dl>

                                        <dl className="flex items-center justify-between gap-4 py-3">
                                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                                            <dd className="text-base font-medium text-gray-900 dark:text-white">$0</dd>
                                        </dl>

                                        <dl className="flex items-center justify-between gap-4 py-3">
                                            <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                                            <dd className="text-base font-bold text-gray-900 dark:text-white">$8,392.00</dd>
                                        </dl>
                                    </div>
                                </div>
                                <Button primary className='!w-full !m-0 !mt-8'>Submit</Button>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        </>
    )
}

export default Page;
