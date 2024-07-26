import Head from 'next/head';
import CardProduct from "../../components/Product";
import CheckIcon from "@mui/icons-material/Check";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import LanguageIcon from "@mui/icons-material/Language";
import MessageIcon from "@mui/icons-material/Message";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { Divider } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ProductService } from '../../service/product';
import { ShopService } from '../../service/shop';
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import Cookie from "js-cookie";
import { useRouter } from 'next/router';

const Page = () => {

    const router = useRouter();
    const { id } = router.query as any;

    const account_id = JSON.parse(Cookie.get("auth") || "{}")?.account_id;
    const defaultImage = "https://cdn-icons-png.flaticon.com/128/4904/4904233.png";

    const [hoveredImage, setHoveredImage] = useState(null);
    const [products, setProducts] = useState([]);
    const [selectedClassify, setSelectedClassify] = useState<{ id: any } | null>(null);
    const [variantId, setVariantId] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const [note, setNote] = useState("");
    const [price, setPrice] = useState(0);
    const [dataAddToCart, setDataAddToCart] = useState({
        account_id: account_id,
        amount: quantity,
        note: note,
        variant_id: variantId,
    });
    const [currentProduct, setCurrentProduct] = useState({
        thumbnail: [
            {
                link: defaultImage,
            },
            {
                link: defaultImage,
            },
            {
                link: defaultImage,
            },
            {
                link: defaultImage,
            },
            {
                link: defaultImage,
            },
            {
                link: defaultImage,
            },
        ],
    } as any);
    const [selectedImage, setSelectedImage] = useState(
        currentProduct?.thumbnail[0]?.link
    );

    const trueDay = (item: any) => {
        const date = new Date(item);
        const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
        const formattedDate = utcDate.toLocaleDateString("en-GB");
        return formattedDate;
    };

    const states = [
        { key: "bestSeller", label: "Best Seller", color: "bg-red-700" },
        { key: "official", label: "Official", color: "bg-blue-700" },
        { key: "topDeal", label: "Top Deal", color: "bg-green-700" },
        { key: "popular", label: "Popular", color: "bg-yellow-700" },
    ];
    const isAllSelected = selectedClassify && quantity > 0;
    const buttonClass = isAllSelected
        ? "border px-2 py-2 bg-[rgb(var(--quaternary-rgb))] rounded-md w-full cursor-pointer text-white"
        : "border px-2 py-2 bg-gray-300 rounded-md w-full cursor-not-allowed";

    const handleSelectClassify = (classtify: any) => {
        setSelectedClassify(classtify);
        setVariantId(classtify?.id);
        setPrice(classtify?.price);
    };

    const handleQuantityChange = (event: any) => {
        const amount = event.target.value;
        setQuantity(amount);
        setDataAddToCart((prevData) => ({
            ...prevData,
            amount: amount,
        }));
    };

    const addItemToCart = async () => {
        const res = await ProductService.addProductToCart(dataAddToCart);
        if (res?.result) {
            toast({
                type: 'success',
                title: 'Success',
                description: 'Add to cart success',
                time: 1000
            })
            handleClear()
        } else {
            toast({
                type: 'error',
                title: 'Error',
                description: 'Add to cart error',
                time: 1000
            })
            handleClear()
        }
    };

    const handleClear = () => {
        setQuantity(0);
        setNote("");
        setSelectedClassify(null);
        setVariantId(null);
        setDataAddToCart({
            account_id: account_id,
            amount: quantity,
            note: note,
            variant_id: variantId,
        });
    }

    const handleNoteChange = (event: any) => {
        const newNote = event.target.value;
        setNote(newNote);
        setDataAddToCart((prevData) => ({
            ...prevData,
            note: newNote,
        }));
    };

    useEffect(() => {
        const fetch = async () => {

            const proDetail = await ProductService.getProductByID(id || 0);
            if (proDetail?.result) {
                setCurrentProduct(proDetail?.data);
                setSelectedImage(currentProduct?.thumbnail[0]?.link);
                const pros = await ShopService.getProductByShop(proDetail?.data?.shop?.id, "all", 1, 12);
                if (pros?.result) {
                    setProducts(pros?.data?.products);
                }
            }
        };
        fetch();
    }, [currentProduct?.thumbnail[0]?.link, id]);

    useEffect(() => {
        if (selectedClassify) {
            setVariantId(selectedClassify?.id);
            setDataAddToCart((prevData) => ({
                ...prevData,
                variant_id: selectedClassify?.id,
            }));
        }
    }, [selectedClassify, variantId]);

    return (
        <>
            <Head>
                <title>KIOTFPT - Smart Ecommerce</title>
                <meta name="description" content="" />
                <meta name="keywords" content="" />
            </Head>
            <div className="w-full flex flex-col justify-center items-center">
                <div className="w-2/3 flex flex-col gap-x-4 border border-[#E0E0E0] rounded-[6px] p-5 my-2 box-border">
                    <div className='w-2/3 flex flex-col justify-center items-center'>
                        <SemanticToastContainer className="w-full" />
                    </div>
                    <div className="w-full flex gap-x-5">
                        <div className="w-2/5 flex flex-col gap-4">
                            <div className="flex justify-center">
                                <img
                                    className="border rounded-md"
                                    src={selectedImage}
                                    alt="img"
                                    style={{ width: "100%" }}
                                />
                            </div>
                            <div className="grid grid-cols-6 gap-x-2">
                                {[
                                    currentProduct?.thumbnail[0]?.link || defaultImage,
                                    currentProduct?.thumbnail[1]?.link || defaultImage,
                                    currentProduct?.thumbnail[2]?.link || defaultImage,
                                    currentProduct?.thumbnail[3]?.link || defaultImage,
                                    currentProduct?.thumbnail[4]?.link || defaultImage,
                                    currentProduct?.thumbnail[5]?.link || defaultImage,
                                ]?.map((item: any, index: any) => {
                                    return (
                                        <img
                                            className="border rounded-md"
                                            key={index}
                                            src={item}
                                            alt="img"
                                            onMouseEnter={() => {
                                                setSelectedImage(item);
                                                setHoveredImage(index);
                                            }}
                                            style={{
                                                cursor: "pointer",
                                                border:
                                                    hoveredImage === index
                                                        ? "1px solid black"
                                                        : "1px solid #E0E0E0",
                                            }}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                        <div className="w-2/5">
                            <div className="grid grid-cols-4 gap-x-1 text-white text-[10px]">
                                {states.map((state) =>
                                    currentProduct?.[state?.key] ? (
                                        <div
                                            key={state?.key}
                                            className={`flex items-center justify-center ${state.color} px-4 py-1 rounded-md gap-1`}
                                        >
                                            <CheckIcon style={{ width: "12px" }} />
                                            <h1>{state?.label}</h1>
                                        </div>
                                    ) : null
                                )}
                            </div>
                            <div className="flex gap-x-2 items-center mt-4">
                                <h1 className="font-semibold text-[20px] my-2">
                                    {currentProduct?.name}
                                </h1>
                                <span className="font-semibold text-red-600 text-[12px] bg-red-100 px-2 rounded-full">
                                    {currentProduct?.discount === 0
                                        ? ""
                                        : "-" + currentProduct?.discount + "%"}
                                </span>
                            </div>
                            <div className="flex items-center w-full">
                                {Array.from(
                                    { length: Math.floor(currentProduct?.rate) },
                                    (_, index) => (
                                        <StarIcon key={index} className="text-[#FF9017]" />
                                    )
                                )}
                                {currentProduct?.shop?.rate % 1 !== 0 && (
                                    <StarHalfIcon className="text-[#FF9017]" />
                                )}
                                {Array.from(
                                    { length: 5 - Math.ceil(currentProduct?.rate) },
                                    (_, index) => (
                                        <StarIcon key={`empty-${index}`} className="text-[#D4CDC5]" />
                                    )
                                )}
                                <div className="flex jusitfy-center items-center gap-x-2">
                                    <FiberManualRecordIcon
                                        className=" text-[#DBDBDB]"
                                        style={{ width: "8px" }}
                                    />
                                    <MessageIcon className="text-[#787A80]" />
                                    <h1 className="text-[#787A80]">
                                        {currentProduct?.rate} review
                                        {currentProduct?.rate > 1 ? "s" : ""}
                                    </h1>
                                    <FiberManualRecordIcon
                                        className=" text-[#DBDBDB]"
                                        style={{ width: "8px" }}
                                    />
                                    <ShoppingBasketIcon className="text-[#787A80]" />
                                    <h1 className="text-[#787A80]">
                                        {currentProduct?.sold} sold
                                        {currentProduct?.sold > 1 ? "s" : ""}
                                    </h1>
                                </div>
                            </div>
                            <div className="flex w-full pt-3 items-center gap-x-2">
                                <h1 className="text-gray-700 font-medium text-xl">Price:</h1>
                                <h1 className="font-semibold text-xl">
                                    {currentProduct?.minPrice === currentProduct?.maxPrice
                                        ? `$${currentProduct?.minPrice}`
                                        : `$${currentProduct?.minPrice} - $${currentProduct?.maxPrice}`}
                                </h1>
                            </div>
                            <Divider className="pt-2" />
                            <div className="flex w-full pt-2">
                                <h1 className="text-gray-700 font-medium w-1/3">Description:</h1>
                                <h1 className="text-[#606060] w-2/3">
                                    {currentProduct?.description}
                                </h1>
                            </div>
                            <Divider className="pt-2" />
                            <div className="flex pt-2 items-center">
                                <h1 className="text-gray-700 font-medium w-1/3 mt-2">
                                    Classify:
                                </h1>
                                <div className="grid grid-cols-3 gap-x-2 pt-2">
                                    {currentProduct?.variants?.map((item: any, index: any) => {
                                        const classifyClass =
                                            item === selectedClassify
                                                ? "border-2 border-gray-700"
                                                : "border";
                                        return (
                                            <div
                                                key={index}
                                                className={`flex w-full ${classifyClass} rounded-md px-3 py-1 items-center cursor-pointer hover:font-bold`}
                                                onClick={() => handleSelectClassify(item)}
                                            >
                                                <div className="text-[#606060] w-full text-[12px]">
                                                    {item?.color?.value} - {item?.size?.value}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="flex w-full pt-2">
                                <h1 className="text-gray-700 font-medium w-1/3 pt-2">
                                    Quantity:
                                </h1>
                                <div className="flex gap-x-2 pt-2">
                                    <input
                                        type="number"
                                        value={quantity}
                                        onChange={handleQuantityChange}
                                        className=" w-full border rounded-md px-2 py-1 outline-none"
                                    />
                                </div>
                            </div>
                            <div className="flex w-full pt-4 text-xl">
                                <h1 className="text-gray-700 font-medium w-1/3 pt-2">Total:</h1>
                                <h1 className=" font-semibold border rounded-md px-2 py-1">
                                    ${price * quantity}
                                </h1>
                            </div>
                            <div className="flex items-center justify-center pt-5 ">
                                <button
                                    onClick={addItemToCart}
                                    className={buttonClass}
                                    disabled={!isAllSelected}
                                >
                                    Add to cart
                                </button>
                            </div>
                            <div className="pt-4 flex flex-col gap-2">
                                <h1 className="text-gray-700 font-medium">Note:</h1>
                                <textarea
                                    name="Note:"
                                    id=""
                                    placeholder="Delivery note (optional)"
                                    value={note}
                                    onChange={handleNoteChange}
                                    className="border rounded-md w-full p-2 outline-none min-h-20"
                                />
                            </div>
                        </div>
                        <div className="w-1/5">
                            <div className="border rounded-md p-4 flex flex-col">
                                <Link
                                    href={{
                                        pathname: `/shop/${currentProduct?.shop?.id}`,
                                    }}
                                >
                                    <div className="flex gap-x-2 cursor-pointer">
                                        <img
                                            src={currentProduct?.shop?.thumbnail}
                                            alt="img"
                                            style={{ width: "50px", height: "50px" }}
                                            className="rounded-md"
                                        />
                                        <div className="text-[12px] flex flex-col justify-center">
                                            <h1 className="text-[16px] font-semibold">
                                                {currentProduct?.shop?.name}
                                            </h1>
                                            <h1>
                                                {Array.from(
                                                    { length: Math.floor(currentProduct?.shop?.rate) },
                                                    (_, index) => (
                                                        <StarIcon key={index} className="text-[#FF9017]" />
                                                    )
                                                )}
                                                {currentProduct?.shop?.rate % 1 !== 0 && (
                                                    <StarHalfIcon className="text-[#FF9017]" />
                                                )}
                                                {Array.from(
                                                    { length: 5 - Math.ceil(currentProduct?.shop?.rate) },
                                                    (_, index) => (
                                                        <StarIcon
                                                            key={`empty-${index}`}
                                                            className="text-[#D4CDC5]"
                                                        />
                                                    )
                                                )}
                                            </h1>
                                        </div>
                                    </div>
                                </Link>
                                <Divider className="pt-5" />
                                <div className="flex items-center gap-x-4 pt-3 text-[#787A80]">
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/128/197/197473.png"
                                        alt="img"
                                        style={{ width: "20px", height: "20px" }}
                                    />
                                    <h1>Can Tho, Vietnam</h1>
                                </div>
                                <div className="flex items-center gap-x-4 pt-3 text-[#787A80]">
                                    <VerifiedUserIcon style={{ width: "20px", height: "20px" }} />
                                    <h1>Verified Seller</h1>
                                </div>
                                <div className="flex items-center gap-x-4 pt-3 text-[#787A80]">
                                    <LanguageIcon style={{ width: "20px", height: "20px" }} />
                                    <h1>Worldwide Shipping</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-2/3 flex flex-col justify-center items-center mt-2">
                    <div className="w-full flex gap-x-4">
                        <div className="w-3/4">
                            <div className=" border rounded-md border-[#E0E0E0] p-4 ">
                                <h1 className="font-bold text-[18px]">Review</h1>
                                <Divider className="pt-2" />
                                {currentProduct.comments?.length > 0 ? (
                                    currentProduct.comments?.slice(0, 5).map((item: any, index: any) => {
                                        return (
                                            <div className="pt-4" key={index}>
                                                <div className="flex justify-between">
                                                    <div className="flex gap-x-2 mt-2">
                                                        <div className="p-2 border rounded-full bg-white">
                                                            <img
                                                                src={item?.profile?.avatar}
                                                                alt="img"
                                                                style={{ width: "24px", height: "24px" }}
                                                            />
                                                        </div>
                                                        <div>
                                                            <h1 className="font-semibold text-[#1C1C1C] ml-1 text-[16px]">
                                                                {item?.profile?.name}
                                                            </h1>
                                                            <div className="flex">
                                                                {Array.from(
                                                                    { length: Math.floor(item?.rate) },
                                                                    (_, index) => (
                                                                        <StarIcon
                                                                            key={index}
                                                                            className="text-[#FF9017]"
                                                                        />
                                                                    )
                                                                )}
                                                                {item?.rate % 1 !== 0 && (
                                                                    <StarHalfIcon className="text-[#FF9017]" />
                                                                )}
                                                                {Array.from(
                                                                    { length: 5 - Math.ceil(item?.rate) },
                                                                    (_, index) => (
                                                                        <StarIcon
                                                                            key={`empty-${index}`}
                                                                            className="text-[#D4CDC5]"
                                                                        />
                                                                    )
                                                                )}
                                                                <div className="flex gap-x-2 justify-center items-center ml-2">
                                                                    <FiberManualRecordIcon
                                                                        className="text-[#DBDBDB]"
                                                                        style={{ width: "8px" }}
                                                                    />
                                                                    <h1 className="text-xs text-gray-500">
                                                                        purchased {trueDay(item?.date)}
                                                                    </h1>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <h1 className="py-4">{item?.content}</h1>
                                                {currentProduct.comments.length > 1 &&
                                                    index < currentProduct.comments.length - 1 && (
                                                        <Divider className="pt-2" />
                                                    )}
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="text-center py-4">No comment</div>
                                )}
                            </div>
                        </div>
                        <div className="w-1/4">
                            <div className="rounded-md border-[#E0E0E0]">
                                <h1 className="font-black text-white pl-3 py-2 rounded-md text-[18px] mb-4 w-full bg-[rgb(var(--quaternary-rgb))]">You may like</h1>
                                {products?.slice(0, 4)?.map((item: any, index: any) => {
                                    return (
                                        <Link
                                            key={index}
                                            href={{
                                                pathname: `/product/${item?.id}`,
                                            }}
                                            className="flex gap-x-2 items-center mb-4 hover:font-black cursor-pointer"
                                        >
                                            <img
                                                className="border rounded-md"
                                                src={item?.thumbnail[0]?.link}
                                                alt="img"
                                                style={{ width: "30%" }}
                                            />
                                            <div className="flex flex-col gap-1">
                                                <div className="text-gray-700 text-[14px]">
                                                    {item?.name}
                                                </div>
                                                <div className="text-gray-500">
                                                    {item?.minPrice === item?.maxPrice
                                                        ? `$${item?.minPrice}`
                                                        : `$${item?.minPrice} - $${item?.maxPrice}`}
                                                </div>
                                                <div className="text-gray-500">
                                                    {item?.sold} sold{item?.sold > 1 ? "s" : ""}
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="w-full mt-8 mb-20">
                        <div className="">
                            <h1 className="font-black text-2xl mb-4 text-gray-700">
                                Related Products
                            </h1>
                            <div className="grid grid-cols-5 gap-x-4">
                                {products.slice(0, 5)?.map((item: any, index: any) => {
                                    return <CardProduct key={index} item={item} index={index} limit={100} />
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page;


