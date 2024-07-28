import React from 'react'
import {
    ModalHeader,
    ModalContent,
    ModalActions,
    Modal,
    FormField,
    Button,
    Form,
    Icon,
    Checkbox
} from 'semantic-ui-react'
import { toast } from 'react-semantic-toasts'
import { AuthService } from '../../service/auth'

interface ModalSignInProps {
    open: boolean
    setOpen: (open: boolean) => void
    initialData: any
}

const ModalSignIn: React.FC<ModalSignInProps> = ({ open, setOpen, initialData }) => {

    const [message, setMessage] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')

    const [isShowForgot, setIsShowForgot] = React.useState(false)
    const [emailForgot, setEmailForgot] = React.useState('')

    const [isShowPassword, setIsShowPassword] = React.useState(false)

    const handleShowForgot = () => {
        setIsShowForgot(!isShowForgot)
    }

    const validate = () => {
        if (username === '') {
            setMessage('Username is required')
            return false
        } else if (password === '') {
            setMessage('Password is required')
            return false
        } else {
            return true
        }
    }

    const showPassword = (e: any, data: any) => {
        setIsShowPassword(data.checked)
    }

    const submit = async () => {
        if (isShowForgot) {
            if (emailForgot === '') {
                setMessage('Email is required')
                return
            } else {
                setLoading(true)
                const res = await AuthService.forgotPassword(emailForgot)
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
            return
        }
        if (!validate()) {
            return
        } else {
            setLoading(true)
            const payload = {
                password: password,
                username: username
            }
            const res = await AuthService.signIn(payload)
            if (res?.result) {
                toast({
                    type: 'success',
                    title: 'Success',
                    description: res?.message,
                    time: 1000
                })
                handleClear()
                window.location.reload()
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
        setEmailForgot('')
        setIsShowForgot(false)
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
            <ModalHeader>{isShowForgot ? 'Forgot Password' : 'Sign In'}</ModalHeader>
            {
                checkMessage() && (
                    <div className="mt-1 p-4 bg-red-100 text-red-600 dark:bg-red-500 dark:text-red-100">
                        {message}
                    </div>
                )
            }
            <ModalContent image className='!relative !flex !flex-col !justify-center !items-center !gap-8'>
                {
                    isShowForgot
                        ?
                        <Form className='!w-full'>
                            <FormField>
                                <label>Enter your email</label>
                                <input type='text' placeholder='Email want to reset password' value={emailForgot} onChange={(e) => { setEmailForgot(e.target.value); setMessage('done') }} />
                            </FormField>
                            <FormField className='!w-full text-start'>
                                <button onClick={handleShowForgot} className='!text-[rgb(3,52,110)] hover:font-bold'><Icon name="arrow left" /> Back to sign in</button>
                            </FormField>
                        </Form>
                        :
                        <Form className='!w-full'>
                            <FormField>
                                <label>Username</label>
                                <input type='text' placeholder='Username' value={username} onChange={(e) => { setUsername(e.target.value); setMessage('done') }} />
                            </FormField>
                            <FormField>
                                <label>Password</label>
                                <input type={isShowPassword ? 'text' : 'password'} placeholder='Password' value={password} onChange={(e) => { setPassword(e.target.value); setMessage('done') }} />
                            </FormField>
                            <div className='w-full flex justify-end items-center mb-10'>
                                <FormField>
                                    <Checkbox label='Show password' onChange={showPassword} />
                                </FormField>
                            </div>
                            <FormField className='!w-full text-center'>
                                <button onClick={handleShowForgot} className='!text-[rgb(3,52,110)] hover:font-bold'>Forgot Password?</button>
                            </FormField>
                        </Form>
                }
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

export default ModalSignIn