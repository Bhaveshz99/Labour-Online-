import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Input, message, Space } from 'antd'
import OtpInput from 'react-otp-input'
import { Link } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import ImgSrc from '../CommonComponents/ImgSrc';
import './signup.scss';
import { callPost } from "../../services/Apis";
import { useDispatch } from "react-redux";
import { addUser } from "../../Redux/slices/authSlice";
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { FacebookAuth } from './FacebookAuth'
import GoogleAuth from './GoogleAuth'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const Login = () => {

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [submitLoading, setSubmitLoading] = useState<boolean>(false)
  const [signUpStep, setSignUpStep] = useState<number>(1)
  const [otp, setOtp] = useState<string>('');
  const [messageApi, contextHolder] = message.useMessage();
  const [loginWith, setLoginWith] = useState<boolean>(true);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const messagePopup = (type: any, content: string) => {
    messageApi.open({
      type,
      content
    });
  };

  const handleLogin = async () => {
    if (!loginWith) {
      let input = { email: email, messageFor: "Login user" }
      await callPost('/otp/send', input).then((result: any) => {
        messagePopup('success', 'Otp send successfully');
        setSignUpStep(2)
      }).catch((error: any) => messagePopup('error', error.message))
    }
    else if (loginWith) {
      let Obj = { email: email, password }
      await callPost('/user/login', Obj).then((result: any) => {
        dispatch(addUser(result.data?.data));
        messagePopup('success', 'Login successfully');
        localStorage.setItem('token', result.data.token)
        if (result.data.data.role === 'user') navigate('/')
        else navigate('/')
      }).catch((error: any) => messagePopup('error', "Enter a valid Email or Password"))
    } else {
      messagePopup('error', 'Email is required');
    }
  }
  const handleOtpSubmit = async () => {
    if (email && otp) {
      let input = { email: email, otp }
      await callPost('/user/loginWithOtp', input).then((result: any) => {
        dispatch(addUser(result.data?.data));
        messagePopup('success', 'Login successfully');
        // setSignUpStep(2)
        localStorage.setItem('token', result.data.token)
        navigate('/');
      }).catch((error: any) => messagePopup('error', "Enter a valid otp"))
    }
    else {
      messagePopup('error', 'Otp is required');
    }
  }

  return (
    <div className='signup_wrapper'>
      {contextHolder}
      <div className='container login_form'>
        <h3>Login <Button onClick={() => setLoginWith(!loginWith)}>Login With {loginWith ? 'OTP' : 'Password'}</Button> </h3>
        <Form>
          {signUpStep > 1 &&
            <div className='back_button'>
              <Button onClick={() => { setSignUpStep(signUpStep - 1) }}><ArrowLeftOutlined /></Button>
            </div>
          }
          {signUpStep === 1 && <>
            {loginWith ?
              <div>
                <Form.Item label='Email'>
                  <Input value={email} placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
                </Form.Item>
                <Form.Item label='Password'>
                  <Input.Password
                    size='small'
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ borderRadius: '6px' }}
                    placeholder="Password"
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />
                </Form.Item>
              </div>
              :
              <Form.Item label='Email'>
                <Input value={email} onChange={(e) => { setEmail(e.target.value) }} />
              </Form.Item>
            }
            <Form.Item>
              <div>
                <Button onClick={handleLogin} size='large' loading={submitLoading}> Proceed </Button>
              </div>
            </Form.Item>
            {/* <GoogleAuth googleWith={"Login"} />
            <FacebookAuth googleWith={"Login"} /> */}



            <div className='align-center'>
              <Link to="/signup"> <Button type="dashed">Create Account </Button> </Link>
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