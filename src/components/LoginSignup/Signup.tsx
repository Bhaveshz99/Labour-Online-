import React, { useState } from 'react'
import { Button, Form, Input, Radio, Upload, message } from 'antd'
import OtpInput from 'react-otp-input'
import { ArrowLeftOutlined, PlusOutlined, CloseCircleOutlined } from '@ant-design/icons'
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import ImgSrc from '../CommonComponents/ImgSrc';
import './signup.scss';
import { callPost, callPut } from "../../services/Apis";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../Redux/slices/authSlice";
import { useNavigate } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';
import { FacebookAuth } from './FacebookAuth';

const Signup: React.FC = () => {

  const [userName, setUserName] = useState<string>('')
  const [fullName, setFullName] = useState<string>('')
  const [userRole, setUserRole] = useState<string>('')
  const [gender, setGender] = useState<string>('')
  const [mobileNumber, setMobileNumber] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [submitLoading, setSubmitLoading] = useState<boolean>(false)
  const [imageUrl, setImageUrl] = useState<string>();
  const [signUpStep, setSignUpStep] = useState<number>(1)
  const [otp, setOtp] = useState<string>('');

  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user)
  const navigate = useNavigate();

  const onFinish = async (e: React.FormEvent) => {
    let objPass = {
      userName: userName,
      fullName: fullName,
      userRole: userRole,
      gender: gender,
      mobileNumber: mobileNumber,
      avatar: imageUrl,
      email: email,
      password: password
    }

    try {
      await callPut('/user/update', objPass).then((res: any) => {
        if (res.data.status === 200) {
          dispatch(addUser(res?.data.data));
          messagePopup('success', 'Update Successfully');
          if (res.data.data.role === 'user') {
            navigate('/')
          }
        }
        else {
          messagePopup('error', res.data.message);
        }

      })
    } catch (error: any) {
      messagePopup('error', error);
    }

  }
  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setImageUrl(url);
      });
    }
  };

  const handleCustomUpload: UploadProps['customRequest'] = (info) => {
    console.log(info);
    getBase64(info.file as RcFile, (url) => {
      setImageUrl(url);
    });
  }

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const [messageApi, contextHolder] = message.useMessage();
  const messagePopup = (type: any, content: string) => {
    messageApi.open({
      type,
      content
    });
  };

  const handleSignUp = async () => {
    const input = {
      email,
      role: userRole
    }
    await callPost('/user/signup', input).then((res: any) => {
      messagePopup('success', 'Send otp');
      setSignUpStep(2);
    }).catch((error: any) => {
      messagePopup('error', error.message);
    })
  }
  const handleOtpSubmit = async () => {
    let input = {
      email,
      otp
    };
    await callPost('/user/loginWithOtp', input).then((res: any) => {
      if (res.data.data && res.data.token) {
        messagePopup('success', 'Account Created Successfully');
        localStorage.setItem('token', res.data.token)
        dispatch(addUser(res?.data.data));
        setSignUpStep(3)
      }
      else {
        messagePopup('error', res.data.message)
      }
    }).catch((error: any) => {
      messagePopup('error', error.message);
    })
  }

  return (
    <div className='signup_wrapper'>
      {contextHolder}
      <div className='container login_form'>
        <h3> Sign Up </h3>
        <Form>
          {signUpStep > 1 &&
            <div className='back_button'>
              <Button onClick={() => { setSignUpStep(signUpStep - 1) }}><ArrowLeftOutlined /></Button>
            </div>
          }
          {signUpStep === 1 && <>
            <Form.Item label='Email'>
              <Input value={email} type={email} onChange={(e) => { setEmail(e.target.value) }} />

            </Form.Item>
            <Form.Item label="Who are you?">
              <Radio.Group value={userRole} className='role_selection' onChange={(e) => { setUserRole(e.target.value) }}>
                <Radio value="user"> <div>
                  <ImgSrc src={'./Assets/avatar/avatar6.svg'} alt='' />
                  <p>  Customer</p>
                </div>
                </Radio>

                <Radio value="contractor">
                  <div>
                    <ImgSrc src={'./Assets/avatar/avatar20.svg'} alt='' />
                    <p>Contractor</p>
                  </div>
                </Radio>
                <Radio value="labour">
                  <div>
                    <ImgSrc src={'./Assets/avatar/avatar7.svg'} alt='' />
                    <p>    Labour</p>
                  </div>
                </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item>
              {/* <GoogleAuth googleWith={"signUp"} />
              <FacebookAuth googleWith={"signUp"} /> */}
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
                numInputs={4}
                separator={<div className='diff'> - </div>}
              />
            </div>
            <div>
              <Button onClick={handleOtpSubmit} size='large' loading={submitLoading}> Proceed </Button>
            </div>
          </>}

          {signUpStep === 3 && <>
            <Form.Item label='User Name' required>
              <Input value={userName} placeholder='User Name' onChange={(e) => { setUserName(e.target.value) }} />
            </Form.Item>

            <Form.Item label='Full Name' required>
              <Input placeholder='Full Name' value={fullName} onChange={(e) => { setFullName(e.target.value) }} />
            </Form.Item>


            <Form.Item label="Upload" valuePropName="fileList">
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                customRequest={handleCustomUpload}

              >
                {imageUrl ? <div> <span className='cancel' onClick={() => { setImageUrl('') }}><CloseCircleOutlined /></span> <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> </div> : <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>}
              </Upload>
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password value={password} onChange={(e) => { setPassword(e.target.value) }} />
            </Form.Item>


            <Form.Item
              label="Gender"
              name="gender"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Radio.Group value={gender} className='role_selection' onChange={(e) => { setGender(e.target.value) }}>
                <Radio value="female">
                  Female
                </Radio>

                <Radio value="male">
                  Male
                </Radio>

              </Radio.Group>

            </Form.Item>

            <Form.Item label='Email' >
              <Input value={email} placeholder='Email' onChange={(e) => { setEmail(e.target.value) }} />
            </Form.Item>
            <div>
              <Button onClick={onFinish} size='large' loading={submitLoading}> Submit </Button>
            </div>
          </>}
        </Form>

      </div>
    </div>
  )
}

export default Signup