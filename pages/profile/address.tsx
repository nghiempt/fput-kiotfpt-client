import Head from 'next/head';
import TabProfile from '../../components/Tab';
import React, { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { ProfileService } from "../../service/profile";
import { toast } from "react-semantic-toasts";
import ModalCreateAddress from '../../components/Modal/modal.create-address';
import Loading from '../../components/Loading';
import ModalUpdateAddress from '../../components/Modal/modal.update-address';

const Page = () => {

    const [addresses, setAddresses] = useState([] as any);
    const [selectedAddress, setSelectedAddress] = useState({} as any);
    const [openModalCreate, setOpenModalCreate] = useState(false)
    const [openModalUpdate, setOpenModalUpdate] = useState(false)

    const handleOpenModalCreate = () => {
        setOpenModalCreate(true);
    }

    const handleOpenModalUpdate = (item: any) => {
        setSelectedAddress(item);
        setOpenModalUpdate(true);
    }

    const setDefault = async (id: any) => {
        const res = await ProfileService.setDefaultAddress(id);
        if (res?.result) {
            toast({
                type: 'success',
                title: 'Success',
                description: res?.message,
                time: 1000
            })
            handleGetAddress();
        } else {
            toast({
                type: 'error',
                title: 'Error',
                description: res?.message,
                time: 1000
            })
            handleGetAddress();
        }
    }

    const handleGetAddress = async () => {
        const fetch = async () => {
            const prof = await ProfileService.getAllAddress();
            if (prof?.result) {
                setAddresses(prof?.data);
            } else {
                return
            }
        }
        fetch();
    }

    useEffect(() => {
        handleGetAddress();
    }, []);

    useEffect(() => { }, [addresses]);

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
                            <div className="w-full box-border flex flex-col gap-4 pb-48">
                                <ModalCreateAddress open={openModalCreate} setOpen={setOpenModalCreate} initialData={handleGetAddress} />
                                <ModalUpdateAddress open={openModalUpdate} setOpen={setOpenModalUpdate} initialData={{}} selectedAddress={selectedAddress} />
                                <h1 className="font-semibold text-[20px] py-4">Address Management</h1>
                                <div className='flex justify-center items-center mb-6'>
                                    <button
                                        onClick={handleOpenModalCreate}
                                        className="w-1/6 flex gap-x-2 bg-[rgb(var(--secondary-rgb))] rounded-md p-4 justify-center items-center hover:opacity-80"
                                    >
                                        <AddIcon style={{ color: '#fff' }} />
                                        <div className="text-white font-medium">Add Address</div>
                                    </button>
                                </div>
                                {
                                    addresses?.length === 0
                                        ?
                                        <div className="w-full pt-32 flex justify-center items-center">
                                            <Loading />
                                        </div>
                                        :
                                        addresses?.map((item: any, index: any) => {
                                            return (
                                                <div key={index} className="w-full flex flex-col bg-gray-50 rounded-lg p-5 border">
                                                    <div className="flex justify-between items-center">
                                                        <div className="flex gap-x-4">
                                                            {item?.isdefault
                                                                ?
                                                                <div className="flex gap-x-1 items-center bg-[rgb(var(--secondary-rgb))] font-medium text-white px-4 py-1 rounded-md">
                                                                    <CheckCircleOutlineIcon style={{ fontSize: "12px" }} />
                                                                    <div className="text-[12px]">Default</div>
                                                                </div>
                                                                :
                                                                <div className="flex justify-start items-center gap-4">
                                                                    <h1 className="font-semibold text-[14px]">Other</h1>
                                                                    <div onClick={() => setDefault(item?.address_id)} className="flex gap-x-1 cursor-pointer hover:font-bold items-center border border-[rgb(var(--secondary-rgb))] font-medium text-[rgb(var(--secondary-rgb))] px-4 py-1 rounded-md">
                                                                        <CheckCircleOutlineIcon style={{ fontSize: "12px" }} />
                                                                        <div className="text-[12px]">Set Default</div>
                                                                    </div>
                                                                </div>
                                                            }

                                                        </div>
                                                        <div className="flex justify-center items-center gap-4">
                                                            <button onClick={() => handleOpenModalUpdate(item)} className="font-medium text-[rgb(var(--secondary-rgb))] hover:font-bold box-border border border-[rgb(var(--secondary-rgb))] py-1 px-8 rounded-md">
                                                                Edit
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-x-2 pt-2">
                                                        <h1>Address:</h1>
                                                        <h1 className="font-medium">{item?.address_value} - {item?.district?.district_value} - {item?.province?.province_value}</h1>
                                                    </div>
                                                </div>
                                            )
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
