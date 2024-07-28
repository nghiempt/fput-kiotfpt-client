import Link from 'next/link';
import React, { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from '@mui/icons-material/Notifications';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Image from 'next/image';
import MenuIcon from "@mui/icons-material/Menu";
import ModalSignIn from './Modal/modal.sign-in';
import { checkSignIn } from '../utils/helper';
import { usePathname } from 'next/navigation'
import { Icon, Input } from 'semantic-ui-react';
import Cookie from 'js-cookie';
import { useRouter } from 'next/router';

const Header = () => {

    const router = useRouter();

    const [searchHistory, setSearchHistory] = React.useState([] as any);

    useEffect(() => {
        const searchHistory = Cookie.get('searchHistory') || "[]";
        if (searchHistory) {
            setSearchHistory(JSON.parse(searchHistory));
        }
    }, []);

    const pathname = usePathname()

    const [key, setKey] = useState<string>("");
    const [openModalSignIn, setOpenModalSignIn] = useState(false)
    const [focusSearch, setFocusSearch] = React.useState(false);

    const handleOpenModalSignIn = () => {
        setOpenModalSignIn(true);
    }

    const handleSearch = () => {
        if (key) {
            let tmp = JSON.parse(Cookie.get('searchHistory') || "[]");
            tmp = [...searchHistory, key];
            tmp = Array.from(new Set(tmp));
            Cookie.set('searchHistory', JSON.stringify(tmp));
            window.location.href = `/product?q=${key}`;
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    const showFocusSearch = () => {
        setFocusSearch(true);
    }

    const hideFocusSearch = (e: any) => {
        if (e.target.tagName === "INPUT") return;
        setFocusSearch(false);
    }

    const deleteHistorySearch = () => {
        Cookie.remove('searchHistory');
        setSearchHistory([]);
    };

    useEffect(() => {
        if (pathname === "/") {
            setKey("");
        }
    }, [pathname])

    return (
        <div className='w-full flex flex-col items-center justify-center' onClick={(e) => hideFocusSearch(e)}>
            <ModalSignIn open={openModalSignIn} setOpen={setOpenModalSignIn} initialData={{}} />
            <div className="w-full flex justify-center items-center">
                <div className="w-2/3 flex gap-x-10 py-5 items-center relative">
                    <div className="w-1/6">
                        <Link
                            href={{
                                pathname: "/",
                            }}
                        >
                            <div className="flex gap-x-2 items-center">
                                <Image src="/logo.png" width={50} height={50} alt="img" />
                                <div className="text-2xl font-bold text-[rgb(var(--primary-rgb))]">KIOTFPT</div>
                            </div>
                        </Link>
                    </div>
                    <div className="w-2/3 px-10">
                        <div className="w-full flex">
                            <Input icon placeholder='Search for products ...' className='w-full rounded-lg'>
                                <input
                                    type="text"
                                    value={key}
                                    onKeyDown={handleKeyDown}
                                    onChange={(e) => setKey(e.target.value)}
                                    onFocus={showFocusSearch}
                                    className="w-full px-4 py-2 box-border rounded-lg border border-gray-300 focus:outline-none"
                                />
                                <Icon name='search' />
                            </Input>
                        </div>
                    </div>
                    {
                        focusSearch && (
                            <div className="w-full flex px-10 items-center absolute top-[60px]">
                                <div className="w-1/6">
                                </div>
                                <div className="w-2/3 px-10">
                                    <div className="w-full box-border bg-white border border-gray-200 shadow-lg rounded-md">
                                        <div className="w-full justify-center items-center pl-2">
                                            <div className="text-[16px] font-medium py-2 text-gray-800">Recent search</div>
                                        </div>
                                        <div>
                                            {
                                                searchHistory?.map((item: any, index: any) => {
                                                    return (
                                                        <Link
                                                            href={`/product?q=${item}`}
                                                            replace
                                                            scroll={false}
                                                            prefetch={true}
                                                            key={index}
                                                            className="flex gap-x-2 p-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-black"
                                                        >
                                                            <Icon name='search' />
                                                            <div>
                                                                {item}
                                                            </div>
                                                        </Link>
                                                    )
                                                })
                                            }
                                        </div>
                                        <div onClick={deleteHistorySearch} className="w-full justify-center items-center text-center cursor-pointer">
                                            <div className="text-[14px] font-medium py-2 text-orange-600 hover:font-bold"><Icon name='trash alternate' />Delete history</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    <div className="flex gap-x-6 text-gray-500">
                        <div className="flex flex-col justify-center items-center hover:font-bold hover:text-black">
                            <button
                                className="flex flex-col justify-center items-center gap-1"
                                onClick={(e) => {
                                    if (checkSignIn()) {
                                        router.push(`/profile/account`);
                                    } else {
                                        handleOpenModalSignIn();
                                    }
                                }}
                            >
                                <PersonIcon />
                                <div>Profile</div>
                            </button>
                        </div>
                        <div className="flex flex-col justify-center items-center hover:font-bold hover:text-black">
                            <button
                                className="flex flex-col justify-center items-center gap-1"
                                onClick={(e) => {
                                    if (checkSignIn()) {
                                        router.push(`/profile/notify`);
                                    } else {
                                        handleOpenModalSignIn();
                                    }
                                }}
                            >
                                <NotificationsIcon />
                                <div>Notify</div>
                            </button>
                        </div>
                        <div className="flex flex-col justify-center items-center hover:font-bold hover:text-black">
                            <button
                                className="flex flex-col justify-center items-center gap-1"
                                onClick={(e) => {
                                    if (checkSignIn()) {
                                        router.push(`/profile/order`);
                                    } else {
                                        handleOpenModalSignIn();
                                    }
                                }}
                            >
                                <InventoryIcon />
                                <div>Order</div>
                            </button>
                        </div>
                        <div className="flex flex-col justify-center items-center hover:font-bold hover:text-black">
                            <button
                                className="flex flex-col justify-center items-center gap-1"
                                onClick={(e) => {
                                    if (checkSignIn()) {
                                        router.push(`/cart`);
                                    } else {
                                        handleOpenModalSignIn();
                                    }
                                }}
                            >
                                <ShoppingCartIcon />
                                <div>Cart</div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-center mb-5 py-3 bg-[rgb(var(--secondary-rgb))] text-white">
                <div className="w-2/3 flex justify-between font-medium">
                    <div className="flex gap-x-5">
                        <div className="flex gap-x-2">
                            <MenuIcon />
                            <Link
                                href={{
                                    pathname: "/product",
                                    query: { type: "all" }
                                }}
                                replace
                                className='hover:font-bold hover:text-white'
                                scroll={false}
                                prefetch={true}
                            >
                                All Categories
                            </Link>
                        </div>
                        <Link
                            href={{
                                pathname: "/product",
                                query: { type: "top-deal" }
                            }}
                            replace
                            className='hover:font-bold hover:text-white'
                            scroll={false}
                            prefetch={true}
                        >
                            Top Deal
                        </Link>
                        <Link
                            href={{
                                pathname: "/product",
                                query: { type: "best-seller" }
                            }}
                            replace
                            className='hover:font-bold hover:text-white'
                            scroll={false}
                            prefetch={true}
                        >
                            Best Seller
                        </Link>
                        <Link
                            href={{
                                pathname: "/product",
                                query: { type: "official" }
                            }}
                            replace
                            className='hover:font-bold hover:text-white'
                            scroll={false}
                            prefetch={true}
                        >
                            Official
                        </Link>
                        <Link
                            href={{
                                pathname: "/product",
                                query: { type: "popular" }
                            }}
                            replace
                            className='hover:font-bold hover:text-white'
                            scroll={false}
                            prefetch={true}
                        >
                            Popular
                        </Link>
                        <Link
                            href={{
                                pathname: "/product",
                                query: { type: "discount" }
                            }}
                            replace
                            className='hover:font-bold hover:text-white'
                            scroll={false}
                            prefetch={true}
                        >
                            Discount
                        </Link>
                    </div>
                    <div className="flex gap-x-5 items-center">
                        <div>
                            English | USD
                        </div>
                        <div className="flex gap-x-2 items-center">
                            Ship to
                            <img
                                src="https://cdn-icons-png.flaticon.com/128/197/197473.png"
                                alt="img"
                                style={{ width: "20px", height: "20px" }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;