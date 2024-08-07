import Head from 'next/head';
import React, { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import CheckIcon from "@mui/icons-material/Check";
import { Pagination } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import EmailIcon from '@mui/icons-material/Email';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { ShopService } from '../../service/shop';
import CardProduct from '../../components/Product';
import { useRouter } from 'next/router';
import Loading from '../../components/Loading';

interface CustomTabPanelProps {
    children: React.ReactNode;
    index: number;
    value: number;
}

const CustomTabPanel: React.FC<CustomTabPanelProps> = ({
    children,
    value,
    index,
}) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            {value === index && (
                <Box>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
};

function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const Page = () => {

    const router = useRouter();
    const { id } = router.query as any;

    const [shop, setShop] = useState<any>(null);
    const [tab, setTab] = React.useState(0);
    const [products, setProducts] = useState([] as any);
    const [loading, setLoading] = React.useState(true);

    const handleFilterType = (event: any, changeTab: any) => {
        setTab(changeTab);
        switch (changeTab) {
            case 0:
                loadProduct("all", 1);
                break;
            case 1:
                loadProduct("official", 1);
                break;
            case 2:
                loadProduct("top-deal", 1);
                break;
            case 3:
                loadProduct("best-seller", 1);
                break;
            case 4:
                loadProduct("popular", 1);
                break;
            default:
                loadProduct("all", 1);
                break;
        }
    };

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
            default:
                return "0"
        }
    }

    const handleFilterByCategory = (id: any) => {
        loadProductByShopCat(id, 1);
    }

    const handleFollowShop = () => {

    }

    const checkFollow = () => {
        return false
    }

    const handleChangePage = (e: any, page: any) => {
        loadProduct("all", page);
    }

    const loadProduct = async (type: string, page: number) => {
        setLoading(true);
        const res = await ShopService.getProductByShop(id, type, page, 12);
        if (res?.result) {
            setProducts(res?.data);
        }
        setLoading(false);
    }

    const loadProductByShopCat = async (shopCatID: any, page: any) => {
        setLoading(true);
        const res = await ShopService.getProductByShopCat(shopCatID, page, 12);
        if (res?.statusCode === '200') {
            setProducts(res?.data);
        } else {
            setProducts([]);
        }
        setLoading(false);
    }

    React.useEffect(() => {
        setLoading(true);
        const fetch = async () => {
            try {
                const [
                    sh,
                    pros,
                ] = await Promise.all([
                    ShopService.getShopByID(id),
                    ShopService.getProductByShop(id, "all", 1, 12)
                ]);
                if (sh?.result) {
                    setShop(sh?.data);
                }
                if (pros?.result) {
                    setProducts(pros?.data);
                }
            } catch (error) {
                return
            }
        };
        fetch();
        setLoading(false);
    }, [id]);

    return (
        <>
            <Head>
                <title>KIOTFPT - Smart Ecommerce</title>
                <meta name="description" content="" />
                <meta name="keywords" content="" />
            </Head>
            <div className="w-full flex flex-col justify-center items-center">
                <div className="w-full flex flex-col justify-center items-center mb-5">
                    <div className="w-2/3 p-4 bg-blue-50 rounded-lg box-border">
                        <div className="w-full flex items-center gap-x-5">
                            <div className="w-1/5 flex gap-3 border-r border-gray-500">
                                <img src={shop?.thumbnail} alt="img" style={{ width: "86px", height: "86px" }} className="rounded-md" />
                                <div className="flex flex-col gap-2">
                                    <h1 className="text-[16px] font-semibold">{shop?.name}</h1>
                                    <div className="flex justify-center items-center bg-[rgb(var(--secondary-rgb))] py-1 px-2 rounded-md">
                                        <CheckIcon style={{ color: "white" }} />
                                        <h1 className="text-white">
                                            Official
                                        </h1>
                                    </div>
                                    <div className="flex gap-x-2 items-center">
                                        <div className="flex justify-center items-center gap-1">
                                            <StarIcon className="text-[#FF9017]" />
                                            <h1 className="text-[12px]">{shop?.rate}&nbsp;/&nbsp;5</h1>
                                        </div>
                                        <div className="flex justify-center items-center gap-1">
                                            <FavoriteIcon className="text-red-500" />
                                            <h1 className="text-[12px]">Followers: {shop?.follower}</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-4/5 flex flex-col justify-center items-start gap-2">
                                <div className="flex justify-center items-center gap-1">
                                    <EmailIcon />
                                    <h1 className="text-[12px]">Email: {shop?.email}</h1>
                                </div>
                                <div className="flex justify-center items-center gap-1">
                                    <PhoneAndroidIcon />
                                    <h1 className="text-[12px]">Phone: {shop?.phone}</h1>
                                </div>
                                <div className="flex justify-center items-center gap-1">
                                    <FmdGoodIcon />
                                    <h1 className="text-[12px]">Location: {shop?.address?.value} - {shop?.address?.district?.value} - {shop?.address?.province?.value}</h1>
                                </div>
                            </div>
                            <div>
                            </div>
                        </div>
                        <div className="w-1/5 mt-4 pr-2">
                            {
                                checkFollow()
                                    ?
                                    <button className="w-full flex justify-center items-center font-medium bg-[rgb(var(--secondary-rgb))] rounded-md py-1.5 text-white cursor-text">Followed</button>
                                    :
                                    <button onClick={handleFollowShop} className="w-full flex justify-center items-center border-2 font-semibold border-[rgb(var(--secondary-rgb))] hover:bg-blue-200 rounded-md py-1 text-[rgb(var(--secondary-rgb))]">+ Follow</button>
                            }
                        </div>
                    </div>
                    <div className="w-2/3 flex mt-8 gap-4">
                        <div className="w-1/5">
                            <div className="box-border gap-4">
                                <div className="font-medium text-[18px] mb-2">Shop categories</div>
                                <div className="flex flex-col gap-2">
                                    {
                                        shop?.shopcategories?.map((item: any, index: any) => {
                                            return (
                                                <div onClick={() => handleFilterByCategory(item?.id)} key={index} className="flex jusitfy-center items-center gap-x-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-100">
                                                    <img src={item?.category?.thumbnail} alt="img" width={30} />
                                                    <div>
                                                        {item?.category?.name}
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="w-4/5 box-border pl-4 rounded-lg">
                            <CustomTabPanel value={0} index={0}>
                                <div>
                                    <div className="flex items-center">
                                        <h1 className="font-semibold text-[20px]">
                                            All Products: &nbsp;{" "}
                                        </h1>
                                        <h1 className="text-[16px]">{products?.totalPage === 1 ? products?.products?.length : renderResult(products?.totalPage)}+ results</h1>
                                    </div>
                                    <div>
                                        <Box sx={{ width: "100%" }}>
                                            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                                <Tabs
                                                    value={tab}
                                                    onChange={handleFilterType}
                                                    aria-label="product"
                                                >
                                                    <Tab label="All" {...a11yProps(0)} sx={{ textTransform: "none", fontSize: "14px" }} />
                                                    <Tab label="Official" {...a11yProps(1)} sx={{ textTransform: "none", fontSize: "14px" }} />
                                                    <Tab label="Top Deal" {...a11yProps(2)} sx={{ textTransform: "none", fontSize: "14px" }} />
                                                    <Tab label="Best Seller" {...a11yProps(3)} sx={{ textTransform: "none", fontSize: "14px" }} />
                                                    <Tab label="Popular" {...a11yProps(4)} sx={{ textTransform: "none", fontSize: "14px" }} />
                                                </Tabs>
                                            </Box>
                                            <CustomTabPanel value={tab} index={0}>
                                                <div className="w-full">
                                                    {
                                                        loading
                                                            ?
                                                            <div className='w-full h-[360px] flex justify-center items-center'>
                                                                <Loading />
                                                            </div>
                                                            :
                                                            products?.products?.length === 0
                                                                ?
                                                                <div className='w-full h-[360px] flex justify-center items-center'>
                                                                    <img
                                                                        src='https://static.vecteezy.com/system/resources/previews/023/914/428/non_2x/no-document-or-data-found-ui-illustration-design-free-vector.jpg'
                                                                        alt='empty'
                                                                        className='w-1/3' />
                                                                </div>
                                                                :
                                                                <div className="w-full grid grid-cols-4 gap-2 mt-4">
                                                                    {
                                                                        products?.products?.map((item: any, index: any) => {
                                                                            return (
                                                                                <CardProduct key={index} item={item} index={index} limit={20} />
                                                                            );
                                                                        })
                                                                    }
                                                                </div>
                                                    }
                                                    <div className="flex justify-center my-10 mb-20">
                                                        <Pagination
                                                            count={products?.totalPage}
                                                            variant="outlined"
                                                            shape="rounded"
                                                            onChange={(e, page) => handleChangePage(e, page)}
                                                        />
                                                    </div>
                                                </div>
                                            </CustomTabPanel>
                                            <CustomTabPanel value={tab} index={1}>
                                                <div className="w-full">
                                                    {
                                                        loading
                                                            ?
                                                            <div className="flex w-full justify-center items-center h-[800px] mt-4">
                                                                <Loading />
                                                            </div>
                                                            :
                                                            <div className="w-full grid grid-cols-4 gap-2 mt-4">
                                                                {
                                                                    products?.products?.map((item: any, index: any) => {
                                                                        return (
                                                                            <CardProduct key={index} item={item} index={index} limit={100} />
                                                                        );
                                                                    })
                                                                }
                                                            </div>
                                                    }
                                                    <div className="flex justify-center my-10 mb-20">
                                                        <Pagination
                                                            count={products?.totalPage}
                                                            variant="outlined"
                                                            shape="rounded"
                                                            onChange={(e, page) => handleChangePage(e, page)}
                                                        />
                                                    </div>
                                                </div>
                                            </CustomTabPanel>
                                            <CustomTabPanel value={tab} index={2}>
                                                <div className="w-full">
                                                    {
                                                        loading
                                                            ?
                                                            <div className="flex w-full justify-center items-center h-[800px] mt-4">
                                                                <Loading />
                                                            </div>
                                                            :
                                                            <div className="w-full grid grid-cols-4 gap-2 mt-4">
                                                                {
                                                                    products?.products?.map((item: any, index: any) => {
                                                                        return (
                                                                            <CardProduct key={index} item={item} index={index} limit={100} />
                                                                        );
                                                                    })
                                                                }
                                                            </div>
                                                    }
                                                    <div className="flex justify-center my-10 mb-20">
                                                        <Pagination
                                                            count={products?.totalPage}
                                                            variant="outlined"
                                                            shape="rounded"
                                                            onChange={(e, page) => handleChangePage(e, page)}
                                                        />
                                                    </div>
                                                </div>
                                            </CustomTabPanel>
                                            <CustomTabPanel value={tab} index={3}>
                                                <div className="w-full">
                                                    {
                                                        loading
                                                            ?
                                                            <div className="flex w-full justify-center items-center h-[800px] mt-4">
                                                                <Loading />
                                                            </div>
                                                            :
                                                            <div className="w-full grid grid-cols-4 gap-2 mt-4">
                                                                {
                                                                    products?.products?.map((item: any, index: any) => {
                                                                        return (
                                                                            <CardProduct key={index} item={item} index={index} limit={100} />
                                                                        );
                                                                    })
                                                                }
                                                            </div>
                                                    }
                                                    <div className="flex justify-center my-10 mb-20">
                                                        <Pagination
                                                            count={products?.totalPage}
                                                            variant="outlined"
                                                            shape="rounded"
                                                            onChange={(e, page) => handleChangePage(e, page)}
                                                        />
                                                    </div>
                                                </div>
                                            </CustomTabPanel>
                                            <CustomTabPanel value={tab} index={4}>
                                                <div className="w-full">
                                                    {
                                                        loading
                                                            ?
                                                            <div className="flex w-full justify-center items-center h-[800px] mt-4">
                                                                <Loading />
                                                            </div>
                                                            :
                                                            <div className="w-full grid grid-cols-4 gap-2 mt-4">
                                                                {
                                                                    products?.products?.map((item: any, index: any) => {
                                                                        return (
                                                                            <CardProduct key={index} item={item} index={index} limit={100} />
                                                                        );
                                                                    })
                                                                }
                                                            </div>
                                                    }
                                                    <div className="flex justify-center my-10 mb-20">
                                                        <Pagination
                                                            count={products?.totalPage}
                                                            variant="outlined"
                                                            shape="rounded"
                                                            onChange={(e, page) => handleChangePage(e, page)}
                                                        />
                                                    </div>
                                                </div>
                                            </CustomTabPanel>
                                            <CustomTabPanel value={tab} index={5}>
                                                <div className="w-full">
                                                    {
                                                        loading
                                                            ?
                                                            <div className="flex w-full justify-center items-center h-[800px] mt-4">
                                                                <Loading />
                                                            </div>
                                                            :
                                                            <div className="w-full grid grid-cols-4 gap-2 mt-4">
                                                                {
                                                                    products?.products?.map((item: any, index: any) => {
                                                                        return (
                                                                            <CardProduct key={index} item={item} index={index} limit={100} />
                                                                        );
                                                                    })
                                                                }
                                                            </div>
                                                    }
                                                    <div className="w-full flex justify-center my-10 mb-20">
                                                        <Pagination
                                                            count={products?.totalPage}
                                                            variant="outlined"
                                                            shape="rounded"
                                                            onChange={(e, page) => handleChangePage(e, page)}
                                                        />
                                                    </div>
                                                </div>
                                            </CustomTabPanel>
                                        </Box>
                                    </div>
                                </div>
                            </CustomTabPanel>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page;
