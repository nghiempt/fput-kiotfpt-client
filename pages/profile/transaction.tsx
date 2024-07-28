import Head from 'next/head';
import TabProfile from '../../components/Tab';
import React, { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import StoreIcon from '@mui/icons-material/Store';
import { ProfileService } from "../../service/profile";
import Loading from '../../components/Loading';
import { NextPage } from 'next';

const TransactionPage: NextPage<any> = () => {

    const [transactions, setTransactions] = useState([] as any);
    const [currentItem, setCurrentItem] = useState({ items: [{ product: { thumbnail: [{ link: '' }] } }] } as any);
    const [currentTransaction, setCurrentTransaction] = useState({} as any);
    const [loading, setLoading] = useState(true);

    const handleGetTransaction = async () => {
        const prof = await ProfileService.getAllTransactions();
        if (prof?.result) {
            setTransactions(prof?.data);
            setCurrentTransaction(prof?.data[0]);
            setCurrentItem(JSON.parse(prof?.data[0]?.desc || '{}'));
        }
        setLoading(false);
    }

    const handleChangeItem = (item: any) => {
        setCurrentTransaction(item);
        setCurrentItem(JSON.parse(item?.desc || '{}'));
    }

    useEffect(() => {
        handleGetTransaction();
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
                            <div className="w-full border-box">
                                <h1 className="font-semibold text-[20px] py-4">Transaction Management</h1>
                                <div className="w-full flex gap-x-4 mt-2">
                                    <div className="w-3/5 flex flex-col gap-6">
                                        <div className="container mx-auto">
                                            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                                                {loading ? (
                                                    <div className="py-10 flex justify-center items-center">
                                                        <Loading />
                                                    </div>
                                                ) : (
                                                    <table className="min-w-full leading-normal">
                                                        <thead>
                                                            <tr>
                                                                <th className="px-5 py-3 bg-[rgb(var(--secondary-rgb))] text-left text-xs font-semibold text-white uppercase tracking-wider">
                                                                    Transaction
                                                                </th>
                                                                <th className="px-5 py-3 bg-[rgb(var(--secondary-rgb))] text-left text-xs font-semibold text-white uppercase tracking-wider">
                                                                    Amount
                                                                </th>
                                                                <th className="px-5 py-3 bg-[rgb(var(--secondary-rgb))] text-left text-xs font-semibold text-white uppercase tracking-wider">
                                                                    Date
                                                                </th>
                                                                <th className="px-5 py-3 bg-[rgb(var(--secondary-rgb))] text-left text-xs font-semibold text-white uppercase tracking-wider">
                                                                    Status
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {transactions?.map((item: any, index: any) => (
                                                                <tr key={index} className="!cursor-pointer" onClick={() => handleChangeItem(item)}>
                                                                    <td className={`px-5 py-5 ${item?.id === currentTransaction?.id ? 'bg-gray-100' : 'bg-white'} border-b border-gray-200 text-sm`}>
                                                                        <div className="flex items-center">
                                                                            <div className="flex-shrink-0 w-10 h-10">
                                                                                <img className="w-full h-full" src="https://cdn-icons-png.flaticon.com/128/3186/3186949.png" alt="transaction icon" />
                                                                            </div>
                                                                            <div className="ml-3">
                                                                                <p className="text-gray-900 whitespace-no-wrap">
                                                                                    Payment #KT-TRAN-{item?.id}
                                                                                </p>
                                                                                <p className="text-gray-600 whitespace-no-wrap flex justify-start items-center">
                                                                                    <StoreIcon style={{ width: '16px', height: '16px', marginRight: '4px' }} />{item?.shop?.name}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td className={`px-5 py-5 ${item?.id === currentTransaction?.id ? 'bg-gray-100' : 'bg-white'} border-b border-gray-200 text-sm`}>
                                                                        <p className="text-gray-900 whitespace-no-wrap">${item?.total}</p>
                                                                    </td>
                                                                    <td className={`px-5 py-5 ${item?.id === currentTransaction?.id ? 'bg-gray-100' : 'bg-white'} border-b border-gray-200 text-sm`}>
                                                                        <p className="text-gray-900 whitespace-no-wrap">{item?.timeComplete?.slice(0, 10)}</p>
                                                                    </td>
                                                                    <td className={`px-5 py-5 ${item?.id === currentTransaction?.id ? 'bg-gray-100' : 'bg-white'} border-b border-gray-200 text-sm`}>
                                                                        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                                                            <span aria-hidden className="absolute inset-0 border border-green-900 opacity-50 rounded-full"></span>
                                                                            <span className="relative">Completed</span>
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                )}
                                                {transactions?.length > 0 && !loading && (
                                                    <div className="flex justify-center gap-x-2 mt-8 pb-6">
                                                        <Pagination count={Math.ceil(transactions?.length / 10)} variant="outlined" shape="rounded" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-2/5 flex flex-col gap-6">
                                        <div className="container mx-auto">
                                            <div className="bg-white shadow-md border rounded-lg p-6">
                                                <div className="flex justify-between items-center mb-4">
                                                    <div className="flex items-center">
                                                        <img src="https://cdn-icons-png.flaticon.com/128/3186/3186949.png" alt="transaction icon" className="w-10 h-10" />
                                                        <div className="ml-3">
                                                            <h2 className="text-lg font-semibold">Order #KT-TRAN-{currentTransaction?.id}</h2>
                                                            <span className="text-sm text-gray-500">{currentTransaction?.shop?.name}</span>
                                                        </div>
                                                    </div>
                                                    <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                                        <span aria-hidden className="absolute inset-0 border border-green-900 opacity-50 rounded-full"></span>
                                                        <span className="relative">Completed</span>
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="text-lg font-medium mb-2">Purchase Details</p>
                                                    <div className="mb-4">
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div>
                                                                <p className="text-sm text-gray-500">Shop</p>
                                                                <div className="flex items-center gap-2">
                                                                    <img src={currentTransaction?.shop?.thumbnail} alt="transaction icon" className="w-6 h-6 inline-block" />
                                                                    <p className="text-sm text-blue-500">{currentTransaction?.shop?.name}</p>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <p className="text-sm text-gray-900">Email: {currentTransaction?.shop?.email}</p>
                                                                <p className="text-sm text-gray-900">Phone: {currentTransaction?.shop?.phone}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mb-4">
                                                        <ul className="timeline">
                                                            <li className="mb-4">
                                                                <p className="text-lg text-gray-900 font-medium">Product</p>
                                                                <div className="flex items-center gap-2">
                                                                    <img src={currentItem?.items[0]?.product?.thumbnail[0]?.link} alt="img" className="w-6 h-6 inline-block" />
                                                                    <p className="text-sm text-gray-500">{currentItem?.items[0]?.product?.name}</p>
                                                                </div>
                                                            </li>
                                                            <li className="mb-4">
                                                                <p className="text-lg text-gray-900 font-medium">Variant</p>
                                                                <p className="text-sm text-gray-500">{currentItem?.items[0]?.variant?.color?.value} | {currentItem?.items[0]?.variant?.size?.value}</p>
                                                            </li>
                                                            <li className="mb-4">
                                                                <p className="text-lg text-gray-900 font-medium">Quantity</p>
                                                                <p className="text-sm text-gray-500">{currentItem?.items[0]?.quantity} items</p>
                                                            </li>
                                                            <li className="mb-4">
                                                                <p className="text-lg text-gray-900 font-medium">Note</p>
                                                                <p className="text-sm text-gray-500">{currentItem?.items[0]?.note}</p>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="flex justify-between items-center mt-6">
                                                        <p className="text-lg font-semibold">Total</p>
                                                        <p className="text-lg font-semibold text-gray-900">${currentTransaction?.total}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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

export default TransactionPage;
