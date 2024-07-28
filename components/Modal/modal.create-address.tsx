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

interface ModalCreateAddressProps {
    open: boolean
    setOpen: (open: boolean) => void
    initialData: any
}

const ModalCreateAddress: React.FC<ModalCreateAddressProps> = ({ open, setOpen, initialData }) => {

    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [addressDetail, setAddressDetail] = useState('')
    const [provinces, setProvinces] = useState([] as any)
    const [districts, setDistricts] = useState([] as any)

    const [addressProvince, setAddressProvince] = useState({} as any)
    const [addressDistrict, setAddressDistrict] = useState({} as any)

    const getAllProvince = async () => {
        let tmp: any = []
        const province = await AddressService.getAllProvinces()
        if (province?.result) {
            province?.data.map((item: any) => {
                tmp = [...tmp, { key: item?.id, value: item?.id, text: item?.value }]
            })
        }
        return tmp
    }

    const getAllDistrict = async (provinceID: any) => {
        let tmp: any = []
        const district = await AddressService.getAllDistrictsByProvinceID(provinceID)
        if (district?.result) {
            district?.data.map((item: any) => {
                tmp = [...tmp, { key: item?.id, value: item?.id, text: item?.value }]
            })
        }
        return tmp
    }

    const handleChangeProvince = async (e: any) => {
        let provinceID = provinces.find((item: any) => item?.text === e?.target?.innerText)?.key
        setAddressProvince({ id: provinceID, value: e?.target?.innerText })
        setAddressDistrict({ id: 0, value: '' })
        const districts = await getAllDistrict(provinceID)
        setDistricts(districts)
    }

    const handleChangeDistrict = async (e: any) => {
        let districtID = districts.find((item: any) => item?.text === e?.target?.innerText)?.key
        setAddressDistrict({ id: districtID, value: e?.target?.innerText })
    }

    const validate = () => {
        if (addressDetail === '') {
            setMessage('addressDetail is required')
            return false
        } else {
            return true
        }
    }

    const submit = async () => {
        if (!validate()) {
            return
        } else {
            setLoading(true)
            const payload =
            {
                account_profile_id: 92,
                address_value: addressDetail,
                default: false,
                district_id: addressDistrict?.id,
                province_id: addressProvince?.id
            }
            const res = await ProfileService.createAddress(payload)
            if (res?.result) {
                toast({
                    type: 'success',
                    title: 'Success',
                    description: 'Create address success',
                    time: 1000
                })
                handleClear()
                initialData()
            } else {
                toast({
                    type: 'error',
                    title: 'Error',
                    description: 'Create address failed',
                    time: 1000
                })
                handleClear()
                initialData()
            }
        }
    }

    const handleClear = () => {
        setMessage('')
        setOpen(false)
        setLoading(false)
        setAddressDetail('')
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
    }

    useEffect(() => {
        init()
    }, [])

    return (
        <Modal
            size='mini'
            onClose={handleClear}
            onOpen={() => setOpen(true)}
            open={open}
        >
            <ModalHeader>Create Address</ModalHeader>
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
                        <input id='address' placeholder='Address Detail' value={addressDetail} onChange={(e) => { setAddressDetail(e.target.value); setMessage('done') }} />
                    </FormField>
                    <FormField>
                        <label>Province</label>
                        <div className='!w-full flex gap-2'>
                            <Select className='!w-full' placeholder='Select your province' options={provinces} onChange={(e) => handleChangeProvince(e)} />
                        </div>
                    </FormField>
                    <FormField>
                        <label>District</label>
                        <div className='!w-full flex gap-2'>
                            <Select className='!w-full' placeholder='Select your district' options={districts} onChange={(e) => handleChangeDistrict(e)} />
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

export default ModalCreateAddress