import Head from 'next/head';
import TabProfile from '../../components/Tab';
import React, { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { ProfileService } from "../../service/profile";
import { toast } from "react-semantic-toasts";
import { getDate, getTime } from "../../utils/helper";
import Loading from '../../components/Loading';

const Page = () => {

    const [notifies, setNotifies] = useState([] as any);

    const handleGetNotify = async () => {
        const fetch = async () => {
            const prof = await ProfileService.getAllNotifications();
            if (prof?.result) {
                setNotifies(prof?.data);
            } else {
                return
            }
        }
        fetch();
    }

    const handleDeleteNotify = async (ID: string) => {
        const res = await ProfileService.deleteNotify(ID);
        if (res?.result) {
            toast({
                type: 'success',
                title: 'Success',
                description: res?.message,
                time: 1000
            })
            handleGetNotify();
        } else {
            toast({
                type: 'error',
                title: 'Error',
                description: res?.message,
                time: 1000
            })
            handleGetNotify();
        }
    }

    useEffect(() => {
        handleGetNotify();
    }, []);

    useEffect(() => { }, [notifies]);

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
                            <div className="w-full box-border pb-36">
                                <h1 className="font-semibold text-[20px] py-4">Notification</h1>
                                <div className="w-full flex gap-x-4  rounded-lg mt-2">
                                    <div className="w-full flex flex-col gap-2">
                                        {
                                            notifies?.length === 0
                                                ?
                                                <div className="w-full pt-20 flex justify-center items-center">
                                                    <Loading />
                                                </div>
                                                :
                                                notifies?.slice(0, 8)?.map((item: any, index: any) => {
                                                    return (
                                                        <div key={index} className="w-full p-2 border rounded-md bg-gray-50">
                                                            <div className="flex justify-between items-center">
                                                                <div className="flex gap-x-4 items-center">
                                                                    <div>
                                                                        <div className="p-2">
                                                                            <img src="https://cdn-icons-png.flaticon.com/128/4616/4616062.png" alt="avatar" className="w-14 h-14" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex flex-col gap-1">
                                                                        <h1 className="font-semibold text-[16px]">{item?.title}</h1>
                                                                        <h1 className="text-[12px]">{item?.description}</h1>
                                                                        <h1 className="text-[12px]">{getDate(item?.time)} &nbsp; - &nbsp; {getTime(item?.time)}</h1>
                                                                    </div>
                                                                </div>
                                                                <div onClick={() => handleDeleteNotify(item?.id)} className="border rounded-full mr-2 p-2 bg-orange-600 hover:bg-orange-700 cursor-pointer">
                                                                    <DeleteIcon className="text-white" />
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
            </div>
        </>
    )
}

export default Page;
