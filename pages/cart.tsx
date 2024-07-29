import Head from 'next/head';
import React, { useEffect, useState } from 'react'
import CardProduct from '../components/Product';
import { ShopService } from '../service/shop';
import { CartService } from '../service/cart';
import Cookie from "js-cookie";
import Loading from '../components/Loading';
import { toast } from 'react-semantic-toasts';
import { ProfileService } from '../service/profile';
import { useRouter } from 'next/router';

const Page = () => {

    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([] as any);
    const [cart, setCart] = useState([] as any);
    const [seletecItems, setSeletecItems] = useState([] as any);
    const [totalPrice, setTotalPrice] = useState(0);
    const [profile, setProfile] = useState({} as any);

    const handleSelect = (e: any, product: any, section: any) => {
        e.preventDefault();
        setTotalPrice(totalPrice + product?.total);
        if (checkSelected(product)) {
            setTotalPrice(totalPrice - product?.total);
            const index = seletecItems.findIndex((item: any) => item?.item?.id === product?.id);
            seletecItems.splice(index, 1);
            setSeletecItems([...seletecItems]);
            return;
        }
        setSeletecItems([...seletecItems, { section_id: section?.section_id, shop_id: section?.shop?.id, item: product }]);
    }

    const checkSelected = (cart: any) => {
        let check = false
        seletecItems.forEach((item: any) => {
            if (item?.item?.id === cart?.id) {
                check = true;
            }
        })
        return check;
    }

    const remove = async (e: any, item: any) => {
        e.stopPropagation();
        const index = seletecItems.findIndex((i: any) => i?.item?.id === item?.id);
        if (index !== -1) {
            seletecItems.splice(index, 1);
            setSeletecItems([...seletecItems]);
        }
        const res = await CartService.removeItemInCart(item?.id);
        if (res?.result) {
            init();
        }
    }

    const updateAmount = async (e: any, item: any, amount: any) => {
        e.stopPropagation();
        if (amount < 1) {
            return;
        }
        const res = await CartService.updateAmountCart(item?.id, amount);
        if (res?.result) {
            init();
        }
    }

    const submit = () => {
        if (checkUpdateProfile(profile)) {
            if (seletecItems.length === 0) {
                toast({
                    type: 'error',
                    title: 'Error',
                    description: 'Please select product to checkout',
                    time: 1000
                })
                return;
            }
            Cookie.set("cart", JSON.stringify(seletecItems));
            router.push('/checkout');
        } else {
            router.push('/profile/account');
        }

    }

    const init = async () => {
        setLoading(true);
        try {
            const [
                car,
                pros,
            ] = await Promise.all([
                CartService.getCart(),
                ShopService.getProductByShop("10", "all", 1, 12)
            ]);
            if (car?.result) {
                setCart(car?.data);
            }
            if (pros?.result) {
                setProducts(pros?.data?.products);
            }
        } catch (error) {
            return
        }
        setLoading(false);
    }

    const checkUpdateProfile = (profile: any) => {
        if (
            profile?.name === '' &&
            profile?.email === '' &&
            profile?.phone === ''
        ) {
            return false;
        } else {
            return true;
        }
    }

    useEffect(() => {
        const fetchProfile = async () => {
            const data = await ProfileService.getProfile();
            if (data?.result) {
                setProfile(data?.data);
            }
        };
        fetchProfile();
    }, []);

    useEffect(() => {
        init()
    }, []);

    useEffect(() => { }, [seletecItems]);

    return (
        <>
            <Head>
                <title>KIOTFPT - Smart Ecommerce</title>
                <meta name="description" content="" />
                <meta name="keywords" content="" />
            </Head>
            <div className="w-full min-h-screen flex flex-col justify-start items-center">
                <section className="w-2/3 antialiased mt-4">
                    <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                        <div className="text-xl font-semibold text-gray-900">Shopping Cart</div>
                        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                                <div className="space-y-6">
                                    {
                                        loading
                                            ?
                                            <div className='w-full h-[240px] flex justify-center items-center'>
                                                <Loading />
                                            </div>
                                            :
                                            cart?.length === 0
                                                ?
                                                <div className='w-full h-[240px] flex justify-center items-center'>
                                                    <img
                                                        src='https://static.vecteezy.com/system/resources/previews/023/914/428/non_2x/no-document-or-data-found-ui-illustration-design-free-vector.jpg'
                                                        alt='empty'
                                                        className='w-1/3' />
                                                </div>
                                                :
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
                                                                            <div key={ind} onClick={(e) => handleSelect(e, item, section)} className={`${checkSelected(item) ? 'border-gray-700 border-2' : 'border-gray-200'} w-full cursor-pointer rounded-lg border bg-white p-4 shadow-sm md:p-6`}>
                                                                                <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                                                                    <img className="h-20 w-20" src={item?.product?.thumbnail[0]?.link} alt="imac image" />
                                                                                    <label className="sr-only">Choose quantity:</label>
                                                                                    <div className="flex items-center justify-between md:order-3 md:justify-end">
                                                                                        <div className="flex flex-col items-center gap-3">
                                                                                            <div>
                                                                                                <button disabled={item?.quantity === 1 ? true : false} onClick={(e) => updateAmount(e, item, item?.quantity - 1)} type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100">
                                                                                                    <svg className="h-2.5 w-2.5 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                                                                                                    </svg>
                                                                                                </button>
                                                                                                <input type="text" id="counter-input" data-input-counter className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0" placeholder="" value={item?.quantity} required />
                                                                                                <button disabled={item?.quantity === 10 ? true : false} onClick={(e) => updateAmount(e, item, item?.quantity + 1)} type="button" id="increment-button" data-input-counter-increment="counter-input" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100">
                                                                                                    <svg className="h-2.5 w-2.5 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                                                                                                    </svg>
                                                                                                </button>
                                                                                            </div>
                                                                                            <div className=''>
                                                                                                (min: 1 items - max: 10 items)
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="text-end md:order-4 md:w-32">
                                                                                            <p className="text-base font-bold text-gray-900">${item?.total}</p>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="w-full min-w-0 flex-1 space-y-2 md:order-2 md:max-w-md">
                                                                                        <div className="text-base font-medium text-gray-900">{item?.product?.name}</div>
                                                                                        <div>Variant: <strong>{item?.variant?.color?.value} | {item?.variant?.size?.value}</strong></div>
                                                                                        <div className="flex items-center gap-4">
                                                                                            <button onClick={(e) => remove(e, item)} type="button" className="inline-flex items-center text-sm font-medium text-red-600 hover:underline ">
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
                                <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                                    <p className="text-xl font-semibold text-gray-900">Order summary</p>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <dl className="flex items-center justify-between gap-4">
                                                <dt className="text-base font-normal text-gray-500">Original price</dt>
                                                <dd className="text-base font-medium text-gray-900">${totalPrice}</dd>
                                            </dl>
                                            <dl className="flex items-center justify-between gap-4">
                                                <dt className="text-base font-normal text-gray-500">Savings</dt>
                                                <dd className="text-base font-medium text-green-600">-$0</dd>
                                            </dl>
                                            <dl className="flex items-center justify-between gap-4">
                                                <dt className="text-base font-normal text-gray-500">Tax</dt>
                                                <dd className="text-base font-medium text-gray-900">$0</dd>
                                            </dl>
                                        </div>
                                        <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                                            <dt className="text-base font-bold text-gray-900">Total</dt>
                                            <dd className="text-base font-bold text-gray-900">${totalPrice}</dd>
                                        </dl>
                                    </div>
                                    <div className="flex items-center justify-center gap-2">
                                        <button onClick={submit} className="inline-flex mt-10 items-center gap-2 text-[16px] font-medium text-primary-700 hover:font-black">
                                            {checkUpdateProfile(profile) ? 'Checkout' : 'Update profile to checkout'}
                                            <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full my-10 mb-20">
                            <div className="">
                                <div className="font-black text-2xl mb-4 text-gray-700">
                                    Related Products
                                </div>
                                <div className="grid grid-cols-5 gap-x-4">
                                    {
                                        products?.length === 0
                                            ?
                                            <Loading />
                                            :
                                            products?.slice(0, 5)?.map((item: any, index: any) => {
                                                return <CardProduct key={index} item={item} index={index} limit={100} />
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
