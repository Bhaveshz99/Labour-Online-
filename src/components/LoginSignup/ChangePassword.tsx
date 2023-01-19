import React, { useState } from 'react'
import { Form, Button, Input } from 'antd'
import { UserProps } from '../../interfaces/user'
const ChangePassword: React.FC<UserProps> = (props: UserProps) => {
    const [password, setPassword] = useState<string>('')
    const [oldPassword, setOldPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [submitLoading, setSubmitLoading] = useState<boolean>(false)
    const handleSubmit = () => {



    }
    return (
        <div className='signup_wrapper'>
            <div className='container login_form'>
                <Form onFinish={handleSubmit}>

                    <Form.Item
                        label="Old Password"
                        name="oldpassword"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password value={oldPassword} onChange={(e) => { setOldPassword(e.target.value) }} />
                    </Form.Item>
                    <Form.Item
                        label="New Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    </Form.Item>
                    <Form.Item
                        label="Confirm Password"
                        name="confirmpassword"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} />
                    </Form.Item>
                    <Form.Item>
                        <div>
                            <Button onClick={handleSubmit} disabled={password !== confirmPassword} loading={submitLoading}> Submit </Button>
                        </div>
                    </Form.Item>


                </Form>

            </div>
        </div >
    )
}

export default ChangePassword