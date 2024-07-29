import React from 'react'
import {
    ModalHeader,
    ModalContent,
    Modal,
} from 'semantic-ui-react'

interface ModalChangeAddressProps {
    open: boolean
    setOpen: (open: boolean) => void
    listAddress: any
    setSelectedAddress: (address: any) => void
}

const ModalChangeAddress: React.FC<ModalChangeAddressProps> = ({ open, setOpen, listAddress, setSelectedAddress }) => {

    const handleChoose = (address: any) => {
        setSelectedAddress(address)
        setOpen(false)
    }

    return (
        <Modal
            size='mini'
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
        >
            <ModalHeader>Change Address</ModalHeader>
            <ModalContent image className='!relative !flex !flex-col !justify-center !items-center !gap-8'>
                <div className='w-full flex flex-col justify-start items-center gap-6'>
                    {
                        listAddress?.map((address: any, index: number) => {
                            return (
                                <div key={index} className="w-full flex justify-start items-center" onClick={() => handleChoose(address)}>
                                    <div className='w-full flex p-2 rounded-lg cursor-pointer hover:bg-gray-100'>
                                        <div className="flex h-5 items-center">
                                            <input type="radio" name="address" value="" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600" />
                                        </div>
                                        <div className="ms-4 text-sm">
                                            <label className="font-medium leading-none text-gray-900">{address?.isdefault ? 'Default' : 'Other'}</label>
                                            <p className="mt-1 text-xs font-normal text-gray-500">{address?.address_value} - {address?.district?.district_value} - {address?.province?.province_value}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </ModalContent>
        </Modal>
    )
}

export default ModalChangeAddress