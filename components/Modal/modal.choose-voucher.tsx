import React, { useEffect } from 'react'
import {
    ModalHeader,
    ModalContent,
    Modal,
    Divider,
    ModalActions,
    Button,
} from 'semantic-ui-react'

interface ModalChooseVoucherProps {
    open: boolean
    setOpen: (open: boolean) => void
    listVoucher: any
    setSelectedVoucher: (voucher: any) => void
}

const ModalChooseVoucher: React.FC<ModalChooseVoucherProps> = ({ open, setOpen, listVoucher, setSelectedVoucher }) => {

    const [listSelected, setListSelected] = React.useState<any>([])

    const checkIsSelected = (voucher: any) => {
        let check = false
        listSelected.forEach((item: any) => {
            if (item.voucher_id === voucher.id) {
                check = true;
            }
        })
        return check;
    }

    const handleChoose = (section: any, voucher: any) => {
        const index = listSelected.findIndex((item: any) => item?.shop_id === section?.shop?.id);
        const indexVoucher = listSelected.findIndex((item: any) => item?.voucher_id === voucher?.id);
        if (index !== -1 && indexVoucher !== -1) {
            let tmp = listSelected
            tmp.splice(index, 1)
            setListSelected([...tmp])
            return
        }
        if (index === -1) {
            const selected = {
                shop_id: section?.shop?.id,
                voucher_id: voucher?.id,
                voucher_value: voucher?.value
            }
            setListSelected([...listSelected, selected])
        } else {
            let tmp = listSelected
            tmp.splice(index, 1)
            setListSelected(tmp)
            const selected = {
                shop_id: section?.shop?.id,
                voucher_id: voucher?.id,
                voucher_value: voucher?.value
            }
            setListSelected([...listSelected, selected])
        }
    }

    const handleClear = () => {
        setListSelected([])
        setOpen(false)
    }

    const submit = () => {
        setSelectedVoucher(listSelected)
        setOpen(false)
    }

    useEffect(() => { 

    }, [listSelected])

    return (
        <Modal
            size='mini'
            onClose={handleClear}
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
                                            section?.vouchers?.filter((voucher: any) => voucher.status?.value === 'active')?.map((voucher: any, ind: number) => {
                                                return (
                                                    <div key={ind} onClick={() => handleChoose(section, voucher)} className='w-full cursor-pointer hover:border-gray-700 hover:border-2 flex justify-between items-center border px-4 py-2 rounded-lg'>
                                                        <div className='flex justify-start items-center gap-3'>
                                                            <img src="https://cdn-icons-png.flaticon.com/128/2327/2327010.png" alt="voucher" className="w-8 h-8" />
                                                            <div className='text-[16px] font-medium'>{voucher?.value}%</div>
                                                        </div>
                                                        {
                                                            checkIsSelected(voucher) && (
                                                                <div className='font-bold text-orange-600'>selected</div>
                                                            )
                                                        }
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
            <ModalActions>
                <Button className='!bg-gray-300' onClick={handleClear}>
                    Cancel
                </Button>
                <Button
                    content="Submit"
                    className='!bg-[rgb(3,52,110)]'
                    labelPosition='right'
                    icon='checkmark'
                    onClick={submit}
                    positive
                />
            </ModalActions>
        </Modal>
    )
}

export default ModalChooseVoucher