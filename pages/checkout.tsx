import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { Icon } from 'semantic-ui-react';
import Cookie from 'js-cookie';
import { CheckoutService } from '../service/checkout';
import { ProfileService } from '../service/profile';
import ModalChangeAddress from '../components/Modal/modal.change-address';
import ModalChooseVoucher from '../components/Modal/modal.choose-voucher';
import { useRouter } from 'next/router';
import { toast } from 'react-semantic-toasts';

interface Input {
    section_id: number;
    shop_id: number;
    item: {
        id: number;
    };
}

interface Output {
    desc: string;
    item_id: number[];
    section_id: number;
    shop_id: number;
    voucher_id: number;
}

interface Voucher {
    shop_id: number;
    voucher_id: number;
}

const Page = () => {

    const router = useRouter();

    const [cart, setCart] = useState([] as any);
    const [addresses, setAddresses] = useState([] as any);
    const [vouchers, setVouchers] = useState([] as any);
    const [selectedAddress, setSelectedAddress] = useState({} as any);
    const [selectedVoucher, setSelectedVoucher] = useState({} as any);
    const [openModalChangeAddress, setOpenModalChangeAddress] = useState(false);
    const [openModalChooseVoucher, setOpenModalChooseVoucher] = useState(false);
    const [discount, setDiscount] = useState([] as any);

    useEffect(() => {
        const cartCookie = Cookie.get('cart');
        if (cartCookie) {
            setCart(JSON.parse(cartCookie));
            const handleGetVoucher = async () => {
                let tmp: any = []
                await JSON.parse(cartCookie)?.forEach(async (section: any) => {
                    const res = await CheckoutService.getVoucherByShop(section.shop_id)
                    if (res?.result) {
                        tmp.push(res?.data)
                    }
                })
                setVouchers(tmp)
                
            }
            handleGetVoucher()
        }
    }, []);

    const handleOpenModalChangeAddress = () => {
        setOpenModalChangeAddress(true);
    };

    const handleOpenModalChooseVoucher = () => {
        setOpenModalChooseVoucher(true);
    };

    function transformArray(input: Input[], listVoucher: Voucher[]): Output[] {
        const result: Output[] = [];
        const sectionMap: { [key: number]: { shop_id: number; items: number[] } } = {};
        const voucherMap: { [key: number]: number } = {};
        listVoucher.forEach(voucher => {
            voucherMap[voucher.shop_id] = voucher.voucher_id;
        });
        input.forEach((entry) => {
            const { section_id, shop_id, item } = entry;
            if (!sectionMap[section_id]) {
                sectionMap[section_id] = { shop_id: shop_id, items: [] };
            }
            sectionMap[section_id].items.push(item.id);
        });
        for (const section_id in sectionMap) {
            const shop_id = sectionMap[section_id].shop_id;
            result.push({
                desc: 'rong ne',
                item_id: sectionMap[section_id].items,
                section_id: Number(section_id),
                shop_id: shop_id,
                voucher_id: voucherMap[shop_id] || 0,
            });
        }
        return result;
    }

    const renderValueVoucher = () => {
        let total = '';
        discount.forEach((item: any, index: any) => {
            console.log(item);
            total += `$${Math.ceil(item)?.toString()}`
            if (index !== discount?.length - 1) {
                total += ' + '
            }
        });
        return total
    }

    const renderSubTotal = () => {
        let total = 0;
        cart.forEach((item: any) => {
            total += item.item.total;
        });
        return total;
    };

    const renderTotal = () => {
        let total = renderSubTotal()
        discount.forEach((item: any, index: any) => {
            total -= Math.ceil(item)
        });
        return total
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const payload = {
            address_id: selectedAddress?.address_id,
            sections: transformArray(cart, selectedVoucher),
        };
        const res = await CheckoutService.checkout(payload);
        if (res?.result) {
            toast({
                type: 'success',
                title: 'Success',
                description: res?.message,
                time: 1000
            })
            Cookie.remove('cart');
            router.push('/');
        } else {
            toast({
                type: 'error',
                title: 'Error',
                description: res?.message,
                time: 1000
            })
            router.push('/');
        }
    };

    const handleApplyVoucher = (listSelected: any) => {
        setSelectedVoucher(listSelected)
        let tmp: any = []
        listSelected.forEach((voucher: any) => {
            const findItem = cart.find((item: any) => item?.shop_id === voucher?.shop_id);
            let discountValue = findItem?.item?.total * (voucher?.voucher_value / 100);
            tmp.push(discountValue)
        });
        setDiscount(tmp);
    }

    const handleGetAddress = async () => {
        const prof = await ProfileService.getAllAddress();
        if (prof?.result) {
            setAddresses(prof?.data);
            let addressDefault = prof?.data.find((item: any) => item.isdefault);
            setSelectedAddress(addressDefault);
        }
    };

    useEffect(() => {
        handleGetAddress();
    }, []);


    return (
        <>
            <Head>
                <title>KIOTFPT - Smart Ecommerce</title>
                <meta name="description" content="" />
                <meta name="keywords" content="" />
            </Head>
            <div className="w-full min-h-screen flex flex-col justify-start items-center">
                <div>{discount?.toString()}</div>
                <ModalChangeAddress
                    open={openModalChangeAddress}
                    setOpen={setOpenModalChangeAddress}
                    listAddress={addresses}
                    setSelectedAddress={setSelectedAddress}
                />
                <ModalChooseVoucher
                    open={openModalChooseVoucher}
                    setOpen={setOpenModalChooseVoucher}
                    listVoucher={vouchers}
                    setSelectedVoucher={handleApplyVoucher}
                />
                <div className="w-2/3 bg-white pt-6 pb-20 antialiased">
                    <div className="text-xl font-semibold text-gray-900 sm:text-2xl">Checkout</div>
                    <form className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                        <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
                            <div className="min-w-0 flex-1 space-y-8">
                                <div className="grid grid-cols-2 gap-10">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Payment</h3>
                                        <div>
                                            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                                                <div className="flex items-start">
                                                    <div className="flex h-5 items-center">
                                                        <input
                                                            id="pay-on-delivery"
                                                            defaultChecked={true}
                                                            aria-describedby="pay-on-delivery-text"
                                                            type="radio"
                                                            name="payment-method"
                                                            value=""
                                                            className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600"
                                                        />
                                                    </div>
                                                    <div className="ms-4 text-sm">
                                                        <label className="font-medium leading-none text-gray-900">Payment on delivery</label>
                                                        <p id="pay-on-delivery-text" className="mt-1 text-xs font-normal text-gray-500">
                                                            +$15 payment processing fee
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Delivery Methods</h3>
                                        <div>
                                            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                                                <div className="flex items-start">
                                                    <div className="flex h-5 items-center">
                                                        <input
                                                            id="free-delivery"
                                                            defaultChecked={true}
                                                            aria-describedby="free-delivery-text"
                                                            type="radio"
                                                            name="delivery-method"
                                                            value=""
                                                            className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600"
                                                        />
                                                    </div>
                                                    <div className="ms-4 text-sm">
                                                        <label className="font-medium leading-none text-gray-900">Free Delivery</label>
                                                        <p id="free-delivery-text" className="mt-1 text-xs font-normal text-gray-500">
                                                            Get it by Friday, 24 Jul 2024
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <div className="w-full">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Address Delivery</h3>
                                        <div>
                                            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                                                <div className="flex justify-between items-center">
                                                    <div className="flex">
                                                        <div className="flex h-5 items-center">
                                                            <input
                                                                id="address-default"
                                                                defaultChecked={true}
                                                                aria-describedby="address-details"
                                                                type="radio"
                                                                name="address"
                                                                value=""
                                                                className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600"
                                                            />
                                                        </div>
                                                        <div className="ms-4 text-sm">
                                                            <label className="font-medium leading-none text-gray-900">Address</label>
                                                            <p id="address-details" className="mt-1 text-xs font-normal text-gray-500">
                                                                {selectedAddress?.address_value} - {selectedAddress?.district?.district_value} - {selectedAddress?.province?.province_value}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div onClick={handleOpenModalChangeAddress}>
                                                        <Icon size="large" name="sync alternate" className="cursor-pointer hover:text-orange-600"></Icon>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold text-gray-900">Products</h3>
                                    <div>
                                        <div className="w-full flex flex-col justify-center items-center gap-4">
                                            {cart?.map((item: any, ind: any) => (
                                                <div key={ind} className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6">
                                                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                                        <div className="shrink-0 md:order-1">
                                                            <img
                                                                className="h-20 w-20"
                                                                src={item?.item?.product?.thumbnail[0]?.link}
                                                                alt="product image"
                                                            />
                                                        </div>
                                                        <label className="sr-only">Choose quantity:</label>
                                                        <div className="flex items-center justify-between md:order-3 md:justify-end">
                                                            <div className="flex items-center">
                                                                <p className="text-base font-bold text-gray-900">{item?.item?.quantity} items</p>
                                                            </div>
                                                            <div className="text-end md:order-4 md:w-32">
                                                                <p className="text-base font-bold text-gray-900">${item?.item?.total}</p>
                                                            </div>
                                                        </div>
                                                        <div className="w-full min-w-0 flex-1 space-y-2 md:order-2 md:max-w-md">
                                                            <div className="text-base font-medium text-gray-900">
                                                                {item?.item?.product?.name}
                                                            </div>
                                                            <div>
                                                                Variant: <strong>{item?.item?.variant?.color?.value} | {item?.item?.variant?.size?.value}</strong>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl font-semibold text-gray-900">Apply Voucher</h3>
                                    <div
                                        className="!m-0 bg-[rgb(var(--secondary-rgb))] text-[14px] hover:font-black cursor-pointer opacity-80 text-white px-4 py-1 rounded-lg font-medium"
                                        onClick={handleOpenModalChooseVoucher}
                                    >
                                        List vouchers
                                    </div>
                                </div>
                                <div className="flow-root">
                                    <div className="-my-3 divide-y divide-gray-200">
                                        <dl className="flex items-center justify-between gap-4 py-3">
                                            <dt className="text-base font-normal text-gray-500">Subtotal</dt>
                                            <dd className="text-base font-medium text-gray-900">${renderSubTotal()}</dd>
                                        </dl>
                                        <dl className="flex items-center justify-between gap-4 py-3">
                                            <dt className="text-base font-normal text-gray-500">Savings</dt>
                                            <dd className="text-base font-medium text-green-500">$0</dd>
                                        </dl>
                                        <dl className="flex items-center justify-between gap-4 py-3">
                                            <dt className="text-base font-normal text-gray-500">Voucher</dt>
                                            <dd className="text-base font-medium text-red-500">{renderValueVoucher()}</dd>
                                        </dl>
                                        <dl className="flex items-center justify-between gap-4 py-3">
                                            <dt className="text-base font-normal text-gray-500">Tax</dt>
                                            <dd className="text-base font-medium text-gray-900">$0</dd>
                                        </dl>
                                        <dl className="flex items-center justify-between gap-4 py-3">
                                            <dt className="text-base font-bold text-gray-900">Total</dt>
                                            <dd className="text-base font-bold text-gray-900">${renderTotal()}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <button onClick={(e) => handleSubmit(e)} className="bg-orange-600 w-full mt-10 py-3 text-white font-medium text-[14px] rounded-lg hover:font-black">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Page;
