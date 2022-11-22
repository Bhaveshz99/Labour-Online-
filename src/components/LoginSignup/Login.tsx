import React, { useState } from 'react'
import { Button, Form, Input, Radio, Upload, message } from 'antd'
import OtpInput from 'react-otp-input'
import { ArrowLeftOutlined } from '@ant-design/icons'
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import ImgSrc from '../CommonComponents/ImgSrc';
import './signup.scss';

const Login = () => {
  const [userName, setUserName] = useState<string>('')
  const [fullName, setFullName] = useState<string>('')
  const [userRole, setUserRole] = useState<string>('')
  const [gender, setGender] = useState<string>('')
  const [mobileNumber, setMobileNumber] = useState<string>('')
  // const [userName, setUserName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [submitLoading, setSubmitLoading] = useState<boolean>(false)
  const [imageUrl, setImageUrl] = useState<string>();

  const [signUpStep, setSignUpStep] = useState<number>(1)
  const [otp, setOtp] = useState<string>('');

  const onFinish = (e: React.FormEvent) => {


  }
  const handleSignUp = () => {
    setSignUpStep(2)
  }
  const handleOtpSubmit = () => {
    let objPass = {
     
    }

  }
  return (
    <div className='signup_wrapper'>
      <div className='container login_form'>
        <Form>
          {signUpStep > 1 &&
            <div className='back_button'>
              <Button onClick={() => { setSignUpStep(signUpStep - 1) }}><ArrowLeftOutlined /></Button>
            </div>
          }
          {signUpStep === 1 && <>
            <Form.Item label='Mobile No.'>
              <Input value={mobileNumber} maxLength={10} minLength={10} onChange={(e) => { setMobileNumber(e.target.value) }} />

            </Form.Item>
            <Form.Item>
              <div>
                <Button onClick={handleSignUp} size='large' loading={submitLoading}> Proceed </Button>
              </div>
            </Form.Item>

          </>}
          {signUpStep === 2 && <>
            <div className='otp_wrapper'>
              <OtpInput
                value={otp}
                className='input_otp'
                onChange={(e: string) => { setOtp(e) }}
                numInputs={6}
                separator={<div className='diff'> - </div>}
              />
            </div>
            <div>
              <Button onClick={handleOtpSubmit} size='large' loading={submitLoading}> Submit </Button>
            </div>
          </>}

        </Form>

      </div>
    </div>
  )
}

export default Login