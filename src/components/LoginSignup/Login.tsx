import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Input, message } from 'antd'
import OtpInput from 'react-otp-input'
import { Link } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import ImgSrc from '../CommonComponents/ImgSrc';
import './signup.scss';
import { callPost } from "../../services/Apis";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../Redux/slices/authSlice";
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { FacebookAuth } from './FacebookAuth'
import GoogleAuth from './GoogleAuth'

const Login = () => {

  const [email, setEmail] = useState<string>('')
  const [submitLoading, setSubmitLoading] = useState<boolean>(false)
  const [signUpStep, setSignUpStep] = useState<number>(1)
  const [otp, setOtp] = useState<string>('');
  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const messagePopup = (type: any, content: string) => {
    messageApi.open({
      type,
      content
    });
  };

  const handleLogin = async () => {
    let input = { email: email, messageFor: "Login user" }

    await callPost('/otp/send', input).then((result: any) => {
      messagePopup('success', 'Otp send successfully');
      setSignUpStep(2)
    }).catch((error: any) => messagePopup('error', error.message))
  }
  const handleOtpSubmit = async () => {
    let input = { email: email, otp }
    await callPost('/user/loginWithOtp', input).then((result: any) => {
      dispatch(addUser(result.data?.data));
      messagePopup('success', 'Login successfully');
      // setSignUpStep(2)
      localStorage.setItem('token', result.data.token)
      if (result.data.data.role === 'user') {
        navigate('/')
      }

    }).catch((error: any) => messagePopup('error', error.message))
  }

  return (
    <div className='signup_wrapper'>
      {contextHolder}
      <div className='container login_form'>
        <h3>Login</h3>
        <Form>
          {signUpStep > 1 &&
            <div className='back_button'>
              <Button onClick={() => { setSignUpStep(signUpStep - 1) }}><ArrowLeftOutlined /></Button>
            </div>
          }
          {signUpStep === 1 && <>
            <Form.Item label='Email'>
              <Input value={email} onChange={(e) => { setEmail(e.target.value) }} />
            </Form.Item>
            <Form.Item>
              <div>
                <Button onClick={handleLogin} size='large' loading={submitLoading}> Proceed </Button>
              </div>
            </Form.Item>
            {/* <GoogleAuth googleWith={"Login"} />
            <FacebookAuth googleWith={"Login"} /> */}
            <div className='align-center'>
                <Link to="/signup"> <u>Create Account </u> </Link>
            </div>
          </>}
          {signUpStep === 2 && <>
            <div className='otp_wrapper'>
              <OtpInput
                value={otp}
                className='input_otp'
                onChange={(e: string) => { setOtp(e) }}
                numInputs={4}
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