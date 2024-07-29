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
import { AuthService } from '../../service/auth'
import Image from 'next/image';

interface ModalSignUpProps {
    open: boolean
    setOpen: (open: boolean) => void
    initialData: any
}

const ModalSignUp: React.FC<ModalSignUpProps> = ({ open, setOpen, initialData }) => {

    const [message, setMessage] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')

    const [isShowPassword, setIsShowPassword] = React.useState(false)

    const validate = () => {
        if (username === '') {
            setMessage('Username is required')
            return false
        } else if (password === '') {
            setMessage('Password is required')
            return false
        }
        else if (confirmPassword === '') {
            setMessage('Confirm Password is required')
            return false
        } else if (password !== confirmPassword) {
            setMessage('Password and Confirm Password must be the same')
            return
        } else {
            return true
        }
    }

    const showPassword = (e: any, data: any) => {
        setIsShowPassword(data.checked)
    }

    const submit = async () => {
        if (!validate()) {
            return
        } else {
            setLoading(true)
            const payload = {
                password: password,
                retypePassword: confirmPassword,
                username: username
            }
            const res = await AuthService.signUp(payload)
            if (res?.result) {
                toast({
                    type: 'success',
                    title: 'Success',
                    description: res?.message,
                    time: 1000
                })
                handleClear()
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
        setUsername('')
        setPassword('')
        setConfirmPassword('')
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
            <ModalHeader>
                <div className='flex justify-start items-center gap-2'>
                    <Image src="/logo.png" width={50} height={50} alt="img" />
                    Sign Up
                </div>
            </ModalHeader>
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
                        <label>Username</label>
                        <input placeholder='Username' value={username} onChange={(e) => { setUsername(e.target.value); setMessage('done') }} />
                    </FormField>
                    <FormField>
                        <label>Password</label>
                        <input
                            type={isShowPassword ? 'text' : 'password'}
                            placeholder='Password'
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); setMessage('done') }}
                        />
                    </FormField>
                    <FormField>
                        <label>Confirm Password</label>
                        <input
                            type={isShowPassword ? 'text' : 'password'}
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(e) => { setConfirmPassword(e.target.value); setMessage('done') }}
                        />
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

export default ModalSignUp