import Head from 'next/head';
import TabProfile from '../../components/Tab';
import React, { useEffect, useState } from "react";
import { ProfileService } from "../../service/profile";
import { Input, Rating } from "semantic-ui-react";
import Loading from '../../components/Loading';

const Page = () => {

    const [productsNeedReview, setProductsNeedReview] = useState([]);
    const [productsReviewed, setProductsReviewed] = useState([]);

    const [review, setReview] = useState('');
    const [rate, setRate] = useState(0);

    const handleSelectedRate = (data: any) => {
        setRate(data?.rating);
    }

    const handleSendReview = async (productID: any, e: any) => {
        const payload = {
            account_id: 105,
            product_id: productID,
            rate: rate,
            content: review,
        }
        const res = await ProfileService.createReview(payload);
        if (res?.result) {
            window.location.reload();
        } else {
            return
        }
    }

    useEffect(() => {
        const fetch = async () => {
            try {
                const [
                    need,
                    reviewed,
                ] = await Promise.all([
                    ProfileService.getProductNeedReview(105),
                    ProfileService.getProductReviewed(105),
                ]);
                if (need?.result) {
                    setProductsNeedReview(need?.data);
                }
                if (reviewed?.result) {
                    setProductsReviewed(reviewed?.data);
                }
            } catch (error) {
                return
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
                <div className="w-full flex flex-col justify-center items-center mb-5">
                    <div className="w-2/3 flex gap-x-8">
                        <TabProfile />
                        <div className="w-4/5">
                            <div className="w-full box-border pb-32">
                                <h1 className="font-semibold text-[20px] py-4">Need Review</h1>
                                <div className="w-full rounded-md grid grid-cols-1 gap-4">
                                    {
                                        productsNeedReview?.length === 0
                                            ?
                                            <div className="py-10 flex justify-center items-center">
                                                <Loading />
                                            </div>
                                            :
                                            productsNeedReview?.map((item: any, index: any) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className="border border-gray-200 rounded-md p-2 cursor-pointer flex flex-row justify-start items-center"
                                                        style={{ position: 'relative' }}
                                                    >
                                                        <img src={item?.thumbnail[0]?.link} alt="img" className="w-32 h-32" />
                                                        <div className="w-full px-4 py-2">
                                                            <div className="w-full text-[16px] font-medium">
                                                                {item?.name}
                                                            </div>
                                                            <Rating icon='star' defaultRating={0} maxRating={5} className="mt-4 mb-6" onRate={(e, data) => handleSelectedRate(data)} />
                                                            <div className="w-full">
                                                                <div className="w-full flex">
                                                                    <input
                                                                        type="text"
                                                                        placeholder='Write your review here...'
                                                                        value={review}
                                                                        onChange={(e) => setReview(e.target.value)}
                                                                        className="w-5/6 px-4 py-2 box-border rounded-l-md border border-gray-300 focus:outline-none focus:border-[rgb(var(--quaternary-rgb))]"
                                                                    />
                                                                    <div className="w-1/6 box-border flex justify-center items-center">
                                                                        <button
                                                                            onClick={(e) => handleSendReview(item?.id, e)}
                                                                            className="w-full px-4 py-2 box-border text-center border font-semibold border-[rgb(var(--quaternary-rgb))] bg-[rgb(var(--quaternary-rgb))] text-white rounded-r-md hover:opacity-80 hover:text-white focus:outline-none">
                                                                            Send
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                </div>
                                <h1 className="font-semibold text-[20px] py-4 mt-6">Reviewed</h1>
                                <div className="w-full rounded-md grid grid-cols-1 gap-4">
                                    {
                                        productsReviewed?.length === 0
                                            ?
                                            <div className="py-10 flex justify-center items-center">
                                                <Loading />
                                            </div>
                                            :
                                            productsReviewed?.map((item: any, index: any) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className="border border-gray-200 rounded-md p-2 cursor-pointer flex flex-row justify-start items-center"
                                                        style={{ position: 'relative' }}
                                                    >
                                                        <img src={item?.productMiniResponse
                                                            ?.thumbnail[0]?.link} alt="img" className="w-32 h-32" />
                                                        <div className="w-full px-4 py-2">
                                                            <div className="w-full text-[16px] font-medium">
                                                                {item?.productMiniResponse
                                                                    ?.name}
                                                            </div>
                                                            <Rating
                                                                icon='star'
                                                                defaultRating={item?.rate}
                                                                maxRating={5}
                                                                className="mt-4 mb-6"
                                                            />
                                                            <div className="w-full">
                                                                <Input
                                                                    placeholder='Write your review here...'
                                                                    value={item?.content}
                                                                    readOnly
                                                                    className="w-full"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page;
