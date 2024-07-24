import React from 'react'
import {
    ModalHeader,
    ModalContent,
    ModalActions,
    Modal,
    FormField,
    Button,
    Form
} from 'semantic-ui-react'
import { toast } from 'react-semantic-toasts'
import { ProfileService } from '../../service/profile'

interface ModalCreateAddressProps {
    open: boolean
    setOpen: (open: boolean) => void
    initialData: any
}

const ModalCreateAddress: React.FC<ModalCreateAddressProps> = ({ open, setOpen, initialData }) => {

    const [message, setMessage] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [addressDetail, setAddressDetail] = React.useState('')

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
                account_profile_id: 91,
                address_value: addressDetail,
                default: true,
                district_id: 3,
                province_id: 65
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
                window.location.reload()
            } else {
                toast({
                    type: 'error',
                    title: 'Error',
                    description: 'Create address failed',
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
        setAddressDetail('')
    }

    const checkMessage = () => {
        if (message !== '' && message !== 'done') {
            return true
        }
        return false
    }

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
                </Form>
            </ModalContent>
            <ModalActions>
                <Button color='grey' onClick={handleClear}>
                    Cancel
                </Button>
                <Button
                    content="Submit"
                    className='!bg-[rgb(78,178,173)]'
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