import React, { useEffect, useState } from 'react'
import {
    ModalHeader,
    ModalContent,
    ModalActions,
    Modal,
    FormField,
    Button,
    Form,
    Select
} from 'semantic-ui-react'
import { toast } from 'react-semantic-toasts'
import { ProfileService } from '../../service/profile'
import { AddressService } from '../../service/address'
import { useRouter } from 'next/router'

interface ModalUpdateAddressProps {
    open: boolean
    setOpen: (open: boolean) => void
    initialData: any
    selectedAddress: any
    setSelectedAddress: any
}

const ModalUpdateAddress: React.FC<ModalUpdateAddressProps> = ({ open, setOpen, initialData, selectedAddress, setSelectedAddress }) => {

    const router = useRouter()

    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [provinces, setProvinces] = useState([] as any)
    const [districts, setDistricts] = useState([] as any)

    const getAllProvince = async () => {
        let tmp: any = []
        const province = await AddressService.getAllProvinces()
        if (province?.result) {
            province?.data.forEach((item: any) => {
                tmp = [...tmp, { key: item?.id, value: item?.id, text: item?.value }]
            })
        }
        return tmp
    }

    const getAllDistrict = async (provinceID: any) => {
        let tmp: any = []
        const district = await AddressService.getAllDistrictsByProvinceID(provinceID)
        if (district?.result) {
            district?.data.forEach((item: any) => {
                tmp = [...tmp, { key: item?.id, value: item?.id, text: item?.value }]
            })
        }
        return tmp
    }

    const handleChangeProvince = async (e: any, { value }: any) => {
        setSelectedAddress({ ...selectedAddress, province: { province_id: value }, district: { district_id: '' } })
        const districts = await getAllDistrict(value)
        setDistricts(districts)
    }

    const handleChangeDistrict = (e: any, { value }: any) => {
        setSelectedAddress({ ...selectedAddress, district: { district_id: value } })
    }

    const validate = () => {
        return true
    }

    const submit = async () => {
        if (!validate()) {
            return
        } else {
            setLoading(true)
            const payload =
            {
                address_id: selectedAddress?.address_id,
                address_value: selectedAddress?.address_value,
                default: selectedAddress?.isdefault,
                district_id: selectedAddress?.district?.district_id,
                province_id: selectedAddress?.province?.province_id
            }
            const res = await ProfileService.updateAddress(payload)
            if (res?.result) {
                toast({
                    type: 'success',
                    title: 'Success',
                    description: res?.message,
                    time: 1000
                })
                handleClear()
                router.reload()
            } else {
                toast({
                    type: 'error',
                    title: 'Error',
                    description: res?.message,
                    time: 1000
                })
                handleClear()
            }
        }
    }

    const handleClear = () => {
        setMessage('')
        setOpen(false)
        setLoading(false)
    }

    const checkMessage = () => {
        if (message !== '' && message !== 'done') {
            return true
        }
        return false
    }

    const init = async () => {
        const provinces = await getAllProvince()
        setProvinces(provinces)
        if (selectedAddress?.province?.province_id) {
            const districts = await getAllDistrict(selectedAddress?.province?.province_id)
            setDistricts(districts)
        }
    }

    useEffect(() => {
        if (open) {
            init()
        }
    }, [open])

    return (
        <Modal
            size='mini'
            onClose={handleClear}
            onOpen={() => setOpen(true)}
            open={open}
        >
            <ModalHeader>Update Address</ModalHeader>
            {
                checkMessage() && (
                    <div className="mt-1 p-4 bg-red-100 text-red-600 dark:bg-red-500 dark:text-red-100">
                        {message}
                    </div>
                )
            }
            <ModalContent image className='!relative !flex !flex-col !justify-center !items-center !gap-8'>
                <Form className='!w-full'>
                    <FormField>
                        <label>Address Detail</label>
                        <input
                            id='address'
                            placeholder='Address Detail'
                            value={selectedAddress?.address_value}
                            onChange={(e) => setSelectedAddress({ ...selectedAddress, address_value: e.target.value })}
                        />
                    </FormField>
                    <FormField>
                        <label>Province</label>
                        <div className='!w-full flex gap-2'>
                            <Select
                                className='!w-full'
                                value={selectedAddress?.province?.province_id}
                                placeholder='Select your province'
                                options={provinces}
                                onChange={handleChangeProvince}
                            />
                        </div>
                    </FormField>
                    <FormField>
                        <label>District</label>
                        <div className='!w-full flex gap-2'>
                            <Select
                                className='!w-full'
                                value={selectedAddress?.district?.district_id}
                                placeholder='Select your district'
                                options={districts}
                                onChange={handleChangeDistrict}
                            />
                        </div>
                    </FormField>
                </Form>
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
                    loading={loading}
                />
            </ModalActions>
        </Modal>
    )
}

export default ModalUpdateAddress
