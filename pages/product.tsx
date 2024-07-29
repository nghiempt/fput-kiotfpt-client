import Head from 'next/head';
import React, { useEffect, useState } from 'react'
import CardProduct from "../components/Product";
import { CircularProgress, Divider } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import StarIcon from "@mui/icons-material/Star";
import { ProductService } from "../service/product";
import { HomeService } from '../service/home';
import { useSearchParams } from 'next/navigation';
import Loading from '../components/Loading';

const Page = () => {

    const searchParam = useSearchParams();

    const qParam = searchParam.get("q");
    const typeParam = searchParam.get("type");
    const brandParam = searchParam.get("brand");
    const categoryParam = searchParam.get("category");

    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<any>();
    const [categories, setCategories] = useState([] as any);
    const [brands, setBrands] = useState([] as any);

    const [visibleProduct, setVisibleProduct] = useState(12);
    const [visibleCategories, setVisibleCategories] = useState(6);
    const [visibleBrand, setVisibleBrand] = useState(6);
    const [showAllCategories, setShowAllCategories] = useState(false);
    const [showAllBrand, setShowAllBrand] = useState(false);

    const [currentSort, setCurrentSort] = useState('default');
    const [currentRate, setCurrentRate] = useState(0);

    const renderDataByRate = (data: any) => {
        switch (currentRate) {
            case 1:
                return data?.filter((item: any) => item.rate === 1);
            case 2:
                return data?.filter((item: any) => item.rate === 2);
            case 3:
                return data?.filter((item: any) => item.rate === 3);
            case 4:
                return data?.filter((item: any) => item.rate === 4);
            case 5:
                return data?.filter((item: any) => item.rate === 5);
            default:
                return data;
        }
    }

    const handleChangeRate = (rate: number) => {
        setCurrentRate(rate);
    };

    const handleShowAllCategories = () => {
        if (showAllCategories) {
            setVisibleCategories(4);
            setShowAllCategories(false);
        } else {
            setVisibleCategories(categories?.length);
            setShowAllCategories(true);
        }
    };

    const handleShowAllBrand = () => {
        if (showAllBrand) {
            setVisibleBrand(4);
            setShowAllBrand(false);
        } else {
            setVisibleBrand(brands?.length);
            setShowAllBrand(true);
        }
    };

    const handleChangeSort = (event: any) => {
        setLoading(true);
        setCurrentSort(event.target.value);
        let tmp: any = [];
        if (event.target.value === "asc") {
            tmp = products?.products?.sort((a: any, b: any) => a.minPrice - b.minPrice);
        } else if (event.target.value === "desc") {
            tmp = products?.products?.sort((a: any, b: any) => b.minPrice - a.minPrice);
        } else {
            tmp = products?.products;
        }
        setProducts({ ...products, products: tmp });
        setLoading(false);
    };

    const getDataBySearch = async (key: string) => {
        setCurrentSort('default');
        setLoading(true);
        const res = await ProductService.searchProduct(key, 1, 2000);
        if (res?.result) {
            setProducts(res?.data);
            setLoading(false);
        } else {
            setProducts([]);
            setLoading(false);
        }
    }

    const getDataByType = async (type: string) => {
        setCurrentSort('default');
        setLoading(true);
        const res = await ProductService.getProductByType(type, 1, 2000);
        if (res?.result) {
            setProducts(res?.data);
            setLoading(false);
        } else {
            setProducts([]);
            setLoading(false);
        }
    }

    const getDataByBrand = async (brandID: string) => {
        setCurrentSort('default');
        setLoading(true);
        const res = await ProductService.getProductByBrand(brandID, 1, 2000);
        if (res?.result) {
            setProducts(res?.data);
            setLoading(false);
        } else {
            setProducts([]);
            setLoading(false);
        }
    }

    const getDataByCategory = async (categoryID: string) => {
        setCurrentSort('default');
        setLoading(true);
        const res = await ProductService.getProductByCategory(categoryID, 1, 2000);
        if (res?.result) {
            setProducts(res?.data);
            setLoading(false);
        } else {
            setProducts([]);
            setLoading(false);
        }
    }

    useEffect(() => {
        setLoading(true);
        const fetch = async () => {
            try {
                const [
                    cats,
                    brads
                ] = await Promise.all([
                    HomeService.getAllCategories(),
                    HomeService.getAllBrands(),
                ]);
                if (cats?.result) {
                    setCategories(cats?.data);
                }
                if (brads?.result) {
                    setBrands(brads?.data);
                }
            } catch (error) {
                return
            }
        };
        fetch();
        setLoading(true);
    }, []);

    useEffect(() => {
        if (qParam) {
            setLoading(true);
            getDataBySearch(searchParam.get("q") as string);
        }
        if (typeParam) {
            setLoading(true);
            getDataByType(searchParam.get("type") as string);
        }
        if (brandParam) {
            setLoading(true);
            getDataByBrand(searchParam.get("brand") as string);
        }
        if (categoryParam) {
            setLoading(true);
            getDataByCategory(searchParam.get("category") as string);
        }
    }, [searchParam, qParam, typeParam, brandParam, categoryParam]);

    useEffect(() => { }, [products]);

    return (
        <>
            <Head>
                <title>KIOTFPT - Smart Ecommerce</title>
                <meta name="description" content="" />
                <meta name="keywords" content="" />
            </Head>
            <div className="w-full flex flex-col justify-center items-center">
                <div className="w-full pb-40 flex flex-col justify-center items-center">
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
                                        if (index < visibleCategories) {
                                            return (
                                                <div
                                                    onClick={() => getDataByCategory(item?.id)}
                                                    key={index}
                                                    className="flex justify-start items-center gap-x-2 hover:font-black rounded-xs"
                                                >
                                                    <label className='cursor-pointer flex justify-start items-center gap-2'>
                                                        <input
                                                            type="radio"
                                                            name='radio'
                                                        />
                                                        <img src={item?.thumbnail} alt={item?.name} className="w-6 h-6 rounded-lg" />
                                                        <div>{item?.name}</div>
                                                    </label>
                                                </div>
                                            );
                                        }
                                        return null;
                                    })}
                                </div>
                                <h1 className="text-[#0D6EFD] cursor-pointer" onClick={handleShowAllCategories}>
                                    {showAllCategories ? "See less" : "See all"}
                                </h1>
                            </div>
                            <Divider className="pt-2" />
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-center">
                                    <h1 className="font-semibold pb-2 pt-2 text-[16px]">Brands</h1>
                                </div>
                                <div className="flex flex-col flex-col-4 gap-2 cursor-pointer">
                                    {brands?.map((item: any, index: any) => {
                                        if (index < visibleBrand) {
                                            return (
                                                <div
                                                    onClick={() => getDataByBrand(item?.brand_id)}
                                                    key={index}
                                                    className="flex justify-start items-center gap-x-2 hover:font-black rounded-xs"
                                                >
                                                    <label className='cursor-pointer flex justify-start items-center gap-2'>
                                                        <input
                                                            type="radio"
                                                            name='radio'
                                                        />
                                                        <img src={item?.brand_thumbnail} alt={item?.name} className="w-6 h-6 rounded-lg" />
                                                        <div>
                                                            {item?.brand_name}
                                                        </div>
                                                    </label>
                                                </div>
                                            );
                                        }
                                        return null;
                                    })}
                                </div>
                                <h1 className="text-[#0D6EFD] cursor-pointer" onClick={handleShowAllBrand}>
                                    {showAllBrand ? "See less" : "See all"}
                                </h1>
                            </div>
                            <Divider className="pt-2" />
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-center">
                                    <h1 className="font-semibold pb-2 pt-2 text-[16px]">Rating</h1>
                                </div>
                                <div className="flex flex-col gap-2 cursor-pointer">
                                    {[5, 4, 3, 2, 1].map((rating: any, index: any) => (
                                        <div onClick={() => handleChangeRate(rating)} className="flex gap-x-2 hover:bg-gray-100 rounded-xs" key={rating}>
                                            <label className='cursor-pointer flex justify-start items-center gap-2'>
                                                <input
                                                    type="radio"
                                                    className="cursor-pointer"
                                                    name='radio'
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
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="w-3/4">
                            <div className="w-full flex box-border border border-[#E0E0E0] rounded-[6px] my-2 px-2 py-2 items-center gap-x-2">
                                <div className="flex w-3/4 pl-2 text-[16px]">
                                    <h1>Result: {products?.products?.length || 0} items</h1>
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
                                                    value={currentSort}
                                                    onChange={handleChangeSort}
                                                >
                                                    <MenuItem value="default">Default</MenuItem>
                                                    <MenuItem value="asc">From low to high</MenuItem>
                                                    <MenuItem value="desc">From high to low</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full min-h-screen mt-4">
                                <div className={`w-full`}>
                                    {
                                        loading
                                            ?
                                            <div className='w-full min-h-screen pt-60 flex justify-center items-start'>
                                                <Loading />
                                            </div>
                                            :
                                            products?.length === 0
                                                ?
                                                <div className='w-full min-h-screen pt-40 flex justify-center items-start'>
                                                    <img
                                                        src='https://static.vecteezy.com/system/resources/previews/023/914/428/non_2x/no-document-or-data-found-ui-illustration-design-free-vector.jpg'
                                                        alt='empty'
                                                        className='w-1/3' />
                                                </div>
                                                :
                                                <div className='w-full grid grid-cols-4 gap-4'>
                                                    {
                                                        renderDataByRate(products?.products)?.map((item: any, index: any) => {
                                                            if (index < visibleProduct) {
                                                                return (
                                                                    <CardProduct
                                                                        key={index}
                                                                        item={item}
                                                                        index={index}
                                                                        limit={20}
                                                                    />
                                                                );
                                                            }
                                                        })
                                                    }
                                                </div>
                                    }
                                </div>
                                {
                                    visibleProduct < products?.products?.length &&
                                    <div className='w-full flex justify-center items-center mt-20'>
                                        <button
                                            onClick={
                                                () => {
                                                    setVisibleProduct(visibleProduct + 12)
                                                }
                                            }
                                            className='hover:font-bold bg-[rgb(var(--secondary-rgb))] px-10 py-2 rounded-lg font-medium text-[12px] text-white'
                                        >
                                            View more
                                        </button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page;
