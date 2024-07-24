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

    const submit = async () => {
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
                    description: 'Sign in success',
                    time: 1000
                })
                handleClear()
                window.location.reload()
            } else {
                toast({
                    type: 'error',
                    title: 'Error',
                    description: 'Sign in failed',
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
            <ModalHeader>Sign In</ModalHeader>
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
                        <input id='username' placeholder='Username' value={username} onChange={(e) => { setUsername(e.target.value); setMessage('done') }} />
                    </FormField>
                    <FormField>
                        <label>Password</label>
                        <input id='password' placeholder='Password' value={password} onChange={(e) => { setPassword(e.target.value); setMessage('done') }} />
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

export default ModalSignIn