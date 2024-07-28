import React from 'react'
import {
    ModalHeader,
    ModalContent,
    Modal,
    Divider,
} from 'semantic-ui-react'

interface ModalChooseVoucherProps {
    open: boolean
    setOpen: (open: boolean) => void
    listVoucher: any
    setSelectedVoucher: (voucher: any) => void
}

const ModalChooseVoucher: React.FC<ModalChooseVoucherProps> = ({ open, setOpen, listVoucher, setSelectedVoucher }) => {

    const handleChoose = (voucher: any) => {
        setSelectedVoucher(voucher)
        setOpen(false)
    }

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
                        listVoucher?.map((section: any, index: number) => {
                            return (
                                <div key={index} className="w-full flex flex-col justify-center items-start">
                                    <div className='w-full flex justify-start items-center gap-3 border-b border-gray-300 pb-2'>
                                        <img src={section?.shop?.thumbnail} alt="voucher" className="w-8 h-8" />
                                        <div className='text-[16px] font-medium'>{section?.shop?.name}</div>
                                    </div>
                                    <div className='w-full flex flex-col justify-start items-center gap-2 mt-2'>
                                        {
                                            section?.vouchers?.map((voucher: any, ind: number) => {
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