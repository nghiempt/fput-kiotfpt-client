import Head from 'next/head';
import React, { useState } from "react";
import Link from "next/link";
import CardProduct from "../components/Product";
import { HomeService } from "../service/home";
import { limitString } from '../utils/helper';
import { SemanticToastContainer } from 'react-semantic-toasts';
import ModalSignUp from '../components/Modal/modal.sign-up';
import ModalSignIn from '../components/Modal/modal.sign-in';
import { AuthService } from '../service/auth';
import Cookie from "js-cookie";

const Page = () => {

    const [session, setSession] = useState();

    const [openModalSignUp, setOpenModalSignUp] = useState(false)
    const [openModalSignIn, setOpenModalSignIn] = useState(false)

    const handleOpenModalSignUp = () => {
        setOpenModalSignUp(true);
    }

    const handleOpenModalSignIn = () => {
        setOpenModalSignIn(true);
    }

    const signOut = () => {
        AuthService.signOut();
        window.location.reload();
    }

    const [categories, setCategories] = React.useState([] as any);
    const [brands, setBrands] = React.useState([] as any);
    const [products, setProducts] = React.useState([] as any);
    const [shops, setShops] = React.useState([] as any);

    React.useEffect(() => {
        setSession(JSON.parse(Cookie.get("auth") || "{}")?.account_id);
        const fetch = async () => {
            try {
                const [
                    cats,
                    brads,
                    pros,
                    shs
                ] = await Promise.all([
                    HomeService.getAllCategories(),
                    HomeService.getAllBrands(),
                    HomeService.searchProduct('', 1, 16),
                    HomeService.getPopularShop(),
                ]);
                if (cats?.result) {
                    setCategories(cats?.data);
                }
                if (brads?.result) {
                    setBrands(brads?.data);
                }
                if (pros?.result) {
                    setProducts(pros?.data?.products);
                }
                if (shs?.result) {
                    setShops(shs?.data);
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
            <ModalSignUp open={openModalSignUp} setOpen={setOpenModalSignUp} initialData={{}} />
            <ModalSignIn open={openModalSignIn} setOpen={setOpenModalSignIn} initialData={{}} />
            <div className="w-full flex flex-col justify-center items-center">
                <div className='w-2/3 flex flex-col justify-center items-center'>
                    <SemanticToastContainer className="w-full" />
                </div>
                <div className="w-full flex flex-col justify-center items-center">
                    <div className="w-2/3 h-[380px] flex gap-x-4 border border-[#E0E0E0] rounded-[6px] p-5 box-border">
                        <div className="font-regular w-1/5 text-[16px]">
                            <div className="font-black text-[20px] text-gray-700 py-2 pl-2">
                                Popular Brands
                            </div>
                            {
                                brands?.slice(0, 5)?.map((item: any, index: any) => {
                                    return (
                                        <Link
                                            key={index}
                                            href={{
                                                pathname: "/product",
                                                query: { brand: item?.brand_id },
                                            }}
                                            replace
                                            scroll={false}
                                            prefetch={true}
                                        >
                                            <div className="focus:font-medium hover:bg-[#eee] hover:text-black hover:font-bold rounded-[6px] hover:cursor-pointer py-2 pl-2 flex justify-start items-center gap-6">
                                                <img src={item?.brand_thumbnail} alt="img" style={{ width: "40px", height: "40px" }} className="rounded-full" />
                                                <h1>{item?.brand_name}</h1>
                                            </div>
                                        </Link>
                                    )
                                })
                            }
                        </div>
                        <div className="w-3/5 h-full">
                            <div className="h-full">
                                <img
                                    src='https://static.vecteezy.com/system/resources/previews/004/617/319/non_2x/electronics-word-concepts-banner-manufacture-maintenance-and-repair-of-household-appliances-presentation-website-isolated-lettering-typography-idea-with-linear-icons-outline-illustration-vector.jpg'
                                    alt="img"
                                    style={{ width: "100%", height: "100%" }}
                                    className="rounded-md"
                                />
                            </div>
                        </div>
                        <div className="w-1/5 grid grid-rows-2 grid-flow-col gap-4">
                            {
                                session === undefined
                                    ?
                                    <div className="bg-blue-100 rounded-[6px] box-border px-4 pt-4">
                                        <div className="grid grid-rows-2 grid-flow-col">
                                            <div>
                                                <div className='text-[18px] font-black'>YOU ARE A GUEST</div>
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                <button
                                                    onClick={handleOpenModalSignUp}
                                                    className="w-full py-2 bg-[rgb(var(--quaternary-rgb))] text-white hover:opacity-80 rounded-[6px] mt-2"
                                                >
                                                    Join now
                                                </button>
                                            </div>
                                            <div>
                                                <button
                                                    onClick={handleOpenModalSignIn}
                                                    className="w-full py-2 bg-white text-[rgb(var(--quaternary-rgb))] hover:bg-gray-100 rounded-[6px] mt-2"
                                                >
                                                    Sign In
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className="bg-blue-100 rounded-[6px] box-border px-4 pt-4">
                                        <div className="grid grid-rows-2 grid-flow-col">
                                            <div>
                                                <div className='text-[18px] font-black'>START TO BUY</div>
                                            </div>
                                        </div>
                                        <div>
                                            <Link href="/profile">
                                                <button
                                                    className="w-full py-2 bg-[rgb(var(--quaternary-rgb))] text-white rounded-[6px] mt-2"
                                                >
                                                    Update your profile
                                                </button>
                                            </Link>
                                            <div>
                                                <button
                                                    onClick={signOut}
                                                    className="w-full py-2 bg-white text-[rgb(var(--quaternary-rgb))] rounded-[6px] mt-2"
                                                >
                                                    Sign Out
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                            }
                            <div>
                                <img
                                    src="https://img.freepik.com/premium-vector/best-seller-banner-thumbs-up_97458-366.jpg"
                                    alt="img"
                                    style={{ width: "100%", height: "100%" }}
                                    className="rounded-md"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-2/3 flex mb-5 mt-10 flex-col">
                        <div className="font-black text-2xl text-gray-700">Popular Categories</div>
                        <div className=" grid grid-cols-8 mt-4 gap-4">
                            {categories?.slice(0, 8)?.map((item: any, index: any) => {
                                return (
                                    <Link href={{
                                        pathname: "/product",
                                        query: { category: item?.id },
                                    }}
                                        key={index}
                                        replace
                                        scroll={false}
                                        prefetch={true}
                                        className="flex border border-[#E0E0E0] hover:border-gray-700 hover:text-black rounded-lg items-center justify-center"
                                    >
                                        <div
                                            className="flex flex-col items-center justify-center text-center p-4 gap-4"
                                        >
                                            <img
                                                src={item?.thumbnail}
                                                alt="img"
                                                style={{ width: "80px", height: "80px" }}
                                            />
                                            <div className='font-medium'>{item?.name}</div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                    <div className="w-2/3 flex border border-[#E0E0E0] box-border p-2 rounded-[6px] my-5">
                        <div className="p-4 w-1/6">
                            <div className="font-bold text-[18px] mt-2">Top Deal Products</div>
                            <div className="text-[#8B96A5] mb-4">Thời gian đang trôi</div>
                            <div className="flex">
                                <div className="border bg-[#606060] p-3 justify-center items-center text-center text-white rounded-[6px]">
                                    <div className="font-bold">04</div>
                                </div>
                                <div className="border bg-[#606060] p-3 justify-center items-center text-center text-white rounded-[6px]">
                                    <div className="font-bold">13</div>
                                </div>
                                <div className="border bg-[#606060] p-3 justify-center items-center text-center text-white rounded-[6px]">
                                    <div className="font-bold">34</div>
                                </div>
                                <div className="border bg-[#606060] p-3 justify-center items-center text-center text-white rounded-[6px]">
                                    <div className="font-bold">56</div>
                                </div>
                            </div>
                        </div>
                        <div className="w-5/6 grid grid-cols-4 gap-2">
                            {products.slice(0, 4)?.map((item: any, index: any) => {
                                return (
                                    <Link
                                        href={{
                                            pathname: `/product/${item?.id}`,
                                        }}
                                        key={index}
                                        className="flex flex-col items-center hover:border-gray-700 justify-center text-center border border-[#E0E0E0] rounded-md p-2 cursor-pointer"
                                    >
                                        <img
                                            src={item?.thumbnail[0]?.link}
                                            alt="img"
                                            style={{ width: "280px", height: "280px" }}
                                        />
                                        <div className="pt-2 text-[rgb(var(--primary-rgb))] text-[16px] font-semibold">{limitString(item?.name, 20)}</div>
                                        <div className="w-1/3 rounded-full px-2 bg-red-100 text-[rgb(var(--primary-rgb))] m-2">
                                            - {item?.discount} %
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                    <div className="w-2/3 flex flex-col">
                        <div className="font-black text-2xl text-gray-700 mt-10">Popular Shops</div>
                        {shops.slice(0, 2)?.map((item: any, index: any) => {
                            return (
                                <Link
                                    key={index}
                                    href={{
                                        pathname: `/shop/${item?.id}`,
                                    }}
                                    className="w-full flex border border-[#E0E0E0] rounded-md my-5"
                                >
                                    <div className="p-4 w-1/5 relative">
                                        <img
                                            src={item?.thumbnail}
                                            alt="img"
                                            style={{ width: "100%", height: "100%" }}
                                            className="rounded-md hover:opacity-80"
                                        />
                                        <div className="absolute top-4 left-4 flex flex-col justify-center items-start gap-2">
                                            <h1 className="text-white text-[18px] font-black bg-[rgb(var(--primary-rgb))] px-4 py-2 rounded-md">
                                                {item?.name}
                                            </h1>
                                        </div>
                                    </div>
                                    <div className="w-4/5 flex flex-col justify-center items-center">
                                        <div className="w-full grid grid-cols-4">
                                            {item?.product.slice(0, 4)?.map((item: any, index: any) => {
                                                return (
                                                    <Link
                                                        key={index}
                                                        href={{
                                                            pathname: `/product/${item?.id}`,
                                                        }}
                                                        className="border-l border-[#E0E0E0] p-2 hover:font-bold"
                                                    >
                                                        <div className="text-[#1C1C1C] text-[16px] p-2">
                                                            {limitString(item?.name, 20)}
                                                        </div>
                                                        <div className="flex justify-between px-2">
                                                            <div className="text-[#8B96A5] text-[13px] mt-2">
                                                                <div>{item?.rate} stars review</div>
                                                                <div>${item?.min_price} - ${item?.max_price}</div>
                                                            </div>
                                                            <img
                                                                src={item?.thumbnail[0]?.link}
                                                                alt="img"
                                                                style={{ width: "82px", height: "82px" }}
                                                                className="rounded-md"
                                                            />
                                                        </div>
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                        <div className="w-full grid grid-cols-4">
                                            {item?.product.slice(4, 8)?.map((item: any, index: any) => {
                                                return (
                                                    <Link
                                                        key={index}
                                                        href={{
                                                            pathname: `/product/${item?.id}`,
                                                        }}
                                                        className="border-l border-t border-[#E0E0E0] p-2 hover:font-bold"
                                                    >
                                                        <div className="text-[#1C1C1C] text-[16px] p-2">
                                                            {limitString(item?.name, 20)}
                                                        </div>
                                                        <div className="flex justify-between px-2">
                                                            <div className="text-[#8B96A5] text-[13px] mt-2">
                                                                <div>{item?.rate} stars review</div>
                                                                <div>${item?.min_price} - ${item?.max_price}</div>
                                                            </div>
                                                            <img
                                                                src={item?.thumbnail[0]?.link}
                                                                alt="img"
                                                                style={{ width: "82px", height: "82px" }}
                                                                className="rounded-md"
                                                            />
                                                        </div>
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </Link>
                            )
                        }
                        )}
                    </div>
                    <div className="w-2/3 my-5">
                        <div className="font-black text-2xl text-gray-700">Recommended Items</div>
                        <div className="py-5 grid grid-cols-5 gap-4">
                            {products.slice(0, 10)?.map((item: any, index: any) => {
                                return (
                                    <CardProduct key={index} item={item} index={index} limit={20} />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page;
