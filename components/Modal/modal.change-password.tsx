import React from 'react'
import {
    ModalHeader,
    ModalContent,
    ModalActions,
    Modal,
    FormField,
    Button,
    Form,
    Checkbox
} from 'semantic-ui-react'
import { toast } from 'react-semantic-toasts'
import { ProfileService } from '../../service/profile'

interface ModalChangePasswordProps {
    open: boolean
    setOpen: (open: boolean) => void
    initialData: any
}

const ModalChangePassword: React.FC<ModalChangePasswordProps> = ({ open, setOpen, initialData }) => {

    const [message, setMessage] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [oldPassword, setOldPassword] = React.useState('')
    const [newPassword, setNewPassword] = React.useState('')
    const [confirmNewPassword, setConfirmNewPassword] = React.useState('')

    const [isShowPassword, setIsShowPassword] = React.useState(false)

    const showPassword = (e: any, data: any) => {
        setIsShowPassword(data.checked)
    }

    const validate = () => {
        if (oldPassword === '') {
            setMessage('oldPassword is required')
            return false
        } else if (newPassword === '') {
            setMessage('newPassword is required')
            return false
        }
        else if (confirmNewPassword === '') {
            setMessage('Confirm Password is required')
            return false
        } else if (newPassword !== confirmNewPassword) {
            setMessage('Password and Confirm Password must be the same')
            return
        } else {
            return true
        }
    }

    const submit = async () => {
        if (!validate()) {
            return
        } else {
            setLoading(true)
            const payload = {
                newPassword: newPassword,
                oldPassword: oldPassword,
                retypePassword: confirmNewPassword
            }
            const res = await ProfileService.updatePassword(payload)
            if (res?.result) {
                toast({
                    type: 'success',
                    title: 'Success',
                    description: 'Change password success',
                    time: 1000
                })
                handleClear()
            } else {
                toast({
                    type: 'error',
                    title: 'Error',
                    description: 'Change password failed',
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
        setOldPassword('')
        setNewPassword('')
        setConfirmNewPassword('')
        setIsShowPassword(false)
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
            <ModalHeader>Change Password</ModalHeader>
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
                        <label>Old Password</label>
                        <input type={isShowPassword ? 'text' : 'password'} placeholder='Old Password' value={oldPassword} onChange={(e) => { setOldPassword(e.target.value); setMessage('done') }} />
                    </FormField>
                    <FormField>
                        <label>New Password</label>
                        <input type={isShowPassword ? 'text' : 'password'} placeholder='New Password' value={newPassword} onChange={(e) => { setNewPassword(e.target.value); setMessage('done') }} />
                    </FormField>
                    <FormField>
                        <label>Confirm New Password</label>
                        <input type={isShowPassword ? 'text' : 'password'} placeholder='Confirm New Password' value={confirmNewPassword} onChange={(e) => { setConfirmNewPassword(e.target.value); setMessage('done') }} />
                    </FormField>
                    <div className='w-full flex justify-end items-center'>
                        <FormField>
                            <Checkbox label='Show password' onChange={showPassword} />
                        </FormField>
                    </div>
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

export default ModalChangePassword