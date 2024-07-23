import Link from 'next/link';
import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from '@mui/icons-material/Notifications';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Image from 'next/image';
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Header = () => {
    return (
        <div className='w-full flex flex-col items-center justify-center'>
            <div className="w-full flex justify-center items-center">
                <div className="w-2/3 flex gap-x-10 py-5 items-center">
                    <div className="w-1/6">
                        <Link
                            href={{
                                pathname: "/",
                            }}
                        >
                            <div className="flex gap-x-2 items-center">
                                <Image src="/logo.png" width={50} height={50} alt="img" />
                                <div className="text-2xl font-bold text-[rgb(var(--quaternary-rgb))]">KIOTFPT</div>
                            </div>
                        </Link>
                    </div>
                    <div className="w-2/3 px-10 relative">
                        <div className="w-full flex">
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-5/6 px-4 py-2 box-border rounded-l-md border border-gray-300 focus:outline-none focus:border-[rgb(var(--quaternary-rgb))]"
                            />
                            <div className="w-1/6 box-border flex justify-center items-center">
                                <button
                                    className="w-full px-4 py-2 box-border text-center border font-semibold border-[rgb(var(--quaternary-rgb))] bg-[rgb(var(--quaternary-rgb))] text-white rounded-r-md hover:bg-[rgb(var(--tertiary-rgb))] focus:outline-none">
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-x-3 text-gray-500">
                        <div className="flex flex-col justify-center items-center">
                            <Link
                                href={{
                                    pathname: "",
                                }}
                                className="flex flex-col justify-center items-center gap-1"
                                onClick={(e) => {

                                }}
                            >
                                <PersonIcon />
                                <div>Profile</div>
                            </Link>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <Link
                                href={{
                                    pathname: "",
                                }}
                                className="flex flex-col justify-center items-center gap-1"
                                onClick={(e) => {

                                }}
                            >
                                <NotificationsIcon />
                                <div>Notify</div>
                            </Link>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <Link
                                href={{
                                    pathname: "",
                                }}
                                className="flex flex-col justify-center items-center gap-1"
                                onClick={(e) => {
                                }}
                            >
                                <InventoryIcon />
                                <div>Order</div>
                            </Link>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <Link
                                href={{
                                    pathname: "",
                                }}
                                className="flex flex-col justify-center items-center gap-1"
                                onClick={(e) => {

                                }}
                            >
                                <ShoppingCartIcon />
                                <div>Cart</div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-center mb-5 py-3 bg-[rgb(var(--quaternary-rgb))] text-white">
                <div className="w-2/3 flex justify-between font-medium">
                    <div className="flex gap-x-5">
                        <div className="flex gap-x-2">
                            <MenuIcon />
                            <Link
                                href={{
                                    pathname: "",
                                    query: { filter: "all" }
                                }}
                                replace
                                scroll={false}
                                prefetch={true}
                            >
                                All Categories
                            </Link>
                        </div>
                        <Link
                            href={{
                                pathname: "",
                                query: { filter: "top-deal" }
                            }}
                            replace
                            scroll={false}
                            prefetch={true}
                        >
                            Top Deal
                        </Link>
                        <Link
                            href={{
                                pathname: "",
                                query: { filter: "best-seller" }
                            }}
                            replace
                            scroll={false}
                            prefetch={true}
                        >
                            Best Seller
                        </Link>
                        <Link
                            href={{
                                pathname: "",
                                query: { filter: "official" }
                            }}
                            replace
                            scroll={false}
                            prefetch={true}
                        >
                            Official
                        </Link>
                        <Link
                            href={{
                                pathname: "",
                                query: { filter: "popular" }
                            }}
                            replace
                            scroll={false}
                            prefetch={true}
                        >
                            Popular
                        </Link>
                        <Link
                            href={{
                                pathname: "",
                                query: { filter: "discount" }
                            }}
                            replace
                            scroll={false}
                            prefetch={true}
                        >
                            Discount
                        </Link>
                    </div>
                    <div className="flex gap-x-5 ">
                        <div>
                            English, USD
                            <ExpandMoreIcon />
                        </div>
                        <div className="flex gap-x-2 items-center">
                            Ship to
                            <img
                                src="https://cdn-icons-png.flaticon.com/128/197/197473.png"
                                alt="img"
                                style={{ width: "20px", height: "20px" }}
                            />
                            <ExpandMoreIcon />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;