import React, { useEffect } from 'react'
import {
    ModalHeader,
    ModalContent,
    Modal,
    Divider,
} from 'semantic-ui-react'
import { CheckoutService } from '../../service/checkout'

interface ModalChooseVoucherProps {
    open: boolean
    setOpen: (open: boolean) => void
    listVoucher: any
    setSelectedVoucher: (voucher: any) => void
}

const ModalChooseVoucher: React.FC<ModalChooseVoucherProps> = ({ open, setOpen, listVoucher, setSelectedVoucher }) => {

    const [listSection, setListSection] = React.useState<any>([])

    const handleChoose = (voucher: any) => {
        setSelectedVoucher(voucher)
        setOpen(false)
    }

    const getVoucher = async () => {
        let tmp: any = []
        listVoucher?.map(async (voucher: any, index: any) => {
            const res = await CheckoutService.getVoucherByShop(voucher.shop_id)
            if (res?.result) {
                tmp.push(res?.data)
            }
        })
        setListSection(tmp)
    }

    useEffect(() => {
        getVoucher()
    }, [])

    return (
        <Modal
            size='mini'
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
        >
            <ModalHeader>Choose Voucher</ModalHeader>
            <ModalContent image className='!relative !flex !flex-col !justify-center !items-center !gap-8'>
                <div className='w-full flex flex-col justify-start items-center gap-6'>
                    {
                        listSection?.map((section: any, index: number) => {
                            return (
                                <div key={index} className="w-full flex flex-col justify-center items-start">
                                    <div className='w-full flex justify-start items-center gap-3 border-b border-gray-300 pb-2'>
                                        <img src="https://cdn-icons-png.flaticon.com/128/273/273177.png" alt="voucher" className="w-8 h-8" />
                                        <div className='text-[16px] font-medium'>Cellphones</div>
                                    </div>
                                    <div className='w-full flex flex-col justify-start items-center gap-2 mt-2'>
                                        {
                                            section?.map((voucher: any, ind: number) => {
                                                return (
                                                    <div key={ind} onClick={() => handleChoose(voucher)} className='w-full cursor-pointer hover:border-gray-700 hover:border-2 flex justify-start items-center gap-3 border px-4 py-2 rounded-lg'>
                                                        <img src="https://cdn-icons-png.flaticon.com/128/2327/2327010.png" alt="voucher" className="w-8 h-8" />
                                                        <div className='text-[16px] font-medium'>{voucher?.value}%</div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <Divider />
                                </div>
                            )
                        })
                    }
                </div>
            </ModalContent>
        </Modal>
    )
}

export default ModalChooseVoucher