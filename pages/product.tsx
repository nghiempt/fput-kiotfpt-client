import Head from 'next/head';
import React, { useEffect, useState } from 'react'
import CardProduct from "../components/Product";
import { Divider, Pagination } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import StarIcon from "@mui/icons-material/Star";
import { ProductService } from "../service/product";
import { HomeService } from '../service/home';

const Page = () => {

    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<any>();
    const [categories, setCategories] = useState([] as any);
    const [brands, setBrands] = useState([] as any);

    const [visibleCategories, setVisibleCategories] = useState(4);
    const [visibleBrand, setVisibleBrand] = useState(4);
    const [showAllCategories, setShowAllCategories] = useState(false);
    const [showAllBrand, setShowAllBrand] = useState(false);

    const renderResult = (totalPage: any) => {
        switch (totalPage) {
            case 1:
                return "4"
            case 2:
                return "12"
            case 3:
                return "24"
            case 4:
                return "36"
            case 5:
                return "48"
            case 6:
                return "60"
            case 7:
                return "72"
            case 8:
                return "84"
            case 9:
                return "96"
            default:
                return "0"
        }
    }

    useEffect(() => {
        setLoading(true);
        const fetch = async () => {
            try {
                const [
                    pros,
                    cats,
                    brads
                ] = await Promise.all([
                    ProductService.getProductByType("all", 1, 12),
                    HomeService.getAllCategories(),
                    HomeService.getAllBrands(),
                ]);
                if (pros?.result) {
                    setProducts(pros?.data);
                }
                if (cats?.result) {
                    setCategories(cats?.data);
                }
                if (brads?.result) {
                    setBrands(brads?.data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetch();
        setLoading(false);
    }, []);

    return (
        <>
            <Head>
                <title>KIOTFPT - Smart Ecommerce</title>
                <meta name="description" content="" />
                <meta name="keywords" content="" />
            </Head>
            <div className="w-full flex flex-col justify-center items-center">
                <div className="w-full pb-10 flex flex-col justify-center items-center">
                    <div className="w-2/3 flex justify-start items-center"></div>
                    <div className="w-2/3 flex gap-5">
                        <div className="w-1/4 flex flex-col gap-2 pb-5">
                            <Divider className="pt-2" />
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-center">
                                    <h1 className="font-semibold pb-2 pt-2 text-[16px]">Categories</h1>
                                </div>
                                <div className="flex flex-col flex-col-4 gap-2 cursor-pointer">
                                    {categories?.map((item: any, index: any) => {
                                        if (index < 4) {
                                            return (
                                                <div
                                                    key={index} className="flex justify-start items-center gap-x-2 hover:bg-gray-100 rounded-xs">
                                                    <input
                                                        type="radio"
                                                    />
                                                    <img src={item?.thumbnail} alt={item?.name} className="w-6 h-6" />
                                                    <h1>{item?.name}</h1>
                                                </div>
                                            );
                                        }
                                        return null;
                                    })}
                                </div>
                                <h1 className="text-[#0D6EFD] cursor-pointer">
                                    {false ? "See less" : "See all"}
                                </h1>
                            </div>
                            <Divider className="pt-2" />
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-center">
                                    <h1 className="font-semibold pb-2 pt-2 text-[16px]">Brands</h1>
                                </div>
                                <div className="flex flex-col flex-col-4 gap-2 cursor-pointer">
                                    {brands?.map((item: any, index: any) => {
                                        if (index < 4) {
                                            return (
                                                <div key={index} className="flex justify-start items-center gap-x-2 hover:bg-gray-100 rounded-xs">
                                                    <input
                                                        type="radio"
                                                    />
                                                    <img src={item?.brand_thumbnail} alt={item?.name} className="w-6 h-6" />
                                                    <h1>
                                                        {item?.brand_name}
                                                    </h1>
                                                </div>
                                            );
                                        }
                                        return null;
                                    })}
                                </div>
                                <h1 className="text-[#0D6EFD] cursor-pointer">
                                    {false ? "See less" : "See all"}
                                </h1>
                            </div>
                            <Divider className="pt-2" />
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-center">
                                    <h1 className="font-semibold pb-2 pt-2 text-[16px]">
                                        Price range
                                    </h1>
                                </div>
                            </div>
                            <div className="w-full flex gap-x-4">
                                <div className="w-1/2">
                                    <h1>Min</h1>
                                    <input
                                        className="w-full p-1 outline-none border-gray-300 border rounded-md box-border"
                                        type="text"
                                        placeholder="0"
                                    />
                                </div>
                                <div className="w-1/2">
                                    <h1>Max</h1>
                                    <input
                                        className="w-full p-1 outline-none border-gray-300 border rounded-md box-border"
                                        type="text"
                                        placeholder="999999"
                                    />
                                </div>
                            </div>
                            <button className="w-full py-2 bg-[rgb(var(--quaternary-rgb))] text-white font-semibold border rounded-[6px] hover:bg-blue-800">
                                Apply
                            </button>
                            <Divider className="pt-2" />
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-center">
                                    <h1 className="font-semibold pb-2 pt-2 text-[16px]">Rating</h1>
                                </div>
                                <div className="flex flex-col gap-2 cursor-pointer">
                                    {[5, 4, 3, 2, 1].map((rating) => (
                                        <div className="flex gap-x-2 hover:bg-gray-100 rounded-xs" key={rating}>
                                            <input
                                                type="radio"
                                                className="cursor-pointer"
                                            />
                                            <div className="flex">
                                                {Array.from({ length: 5 }, (_, index) => (
                                                    <StarIcon
                                                        key={index}
                                                        className={
                                                            index < rating ? "text-[#FF9017]" : "text-[#D4CDC5]"
                                                        }
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="w-3/4">
                            <div className="w-full flex box-border border border-[#E0E0E0] rounded-[6px] my-2 px-2 py-2 items-center gap-x-2">
                                <div className="flex w-3/4 pl-2 text-[16px]">
                                    <h1>Result: {renderResult(products?.totalPage)}+ items</h1>
                                </div>
                                <div className="w-1/4 flex items-center gap-x-4">
                                    <div className="w-full">
                                        <Box sx={{ minWidth: 120 }}>
                                            <FormControl fullWidth>
                                                <InputLabel id="sort-select-label">Sort</InputLabel>
                                                <Select
                                                    labelId="sort-select-label"
                                                    id="sort-select"
                                                    label="Features"
                                                >
                                                    <MenuItem value="">None</MenuItem>
                                                    <MenuItem value="asc">From low to high</MenuItem>
                                                    <MenuItem value="desc">From high to low</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full mt-4">
                                <div className="w-full grid grid-cols-4 gap-4">
                                    {products?.products?.map((item: any, index: any) => {
                                        return (
                                            <CardProduct
                                                key={index}
                                                item={item}
                                                index={index}
                                                limit={20}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="w-full flex justify-center gap-x-2 mt-8">
                                <Pagination
                                    count={products?.totalPage}
                                    variant="outlined"
                                    shape="rounded"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page;
