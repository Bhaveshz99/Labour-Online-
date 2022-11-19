import React, { useState } from 'react'
import { Button, Form, Input, Radio, Upload, message } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

const Signup = () => {

  const [userName, setUserName] = useState<string>('')
  const [fullName, setFullName] = useState<string>('')
  const [userRole, setUserRole] = useState<string>('')
  const [gender, setGender] = useState<string>('')
  const [mobileNumber, setMobileNumber] = useState<string>('')
  // const [userName, setUserName] = useState<string>('')
  const [submitLoading, setSubmitLoading] = useState<boolean>(false)
  const [imageUrl, setImageUrl] = useState<string>();

  const onFinish = (e: React.FormEvent) => {
    let objPass = {
      userName: userName,
      fullName: fullName,
      userRole: userRole,
      gender: gender,
      mobileNumber: mobileNumber,
      avatar: imageUrl
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
  return (
    <div className='signup_wrapper'>
      <div className='container'>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          // layout="horizontal"
          // onFinish={onFinish}
          onFinish={(e) => { onFinish(e) }}
        >

          <Form.Item label='User Name' required>
            <Input value={userName} placeholder='User Name' onChange={(e) => { setUserName(e.target.value) }} />
          </Form.Item>


          <Form.Item label='Full Name' required>
            <Input placeholder='Full Name' value={fullName} onChange={(e) => { setFullName(e.target.value) }} />
          </Form.Item>

          <Form.Item label='Role' required>
            <Radio.Group value={userRole} onChange={(e) => { setUserRole(e.target.value) }}>
              <Radio value="customer"> Customer </Radio>
              <Radio value="contractor"> Contractor </Radio>
              <Radio value="labour"> Labour </Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label='Gender' required>
            <Radio.Group value={gender} onChange={(e) => { setGender(e.target.value) }}>
              <Radio value="male"> Male </Radio>
              <Radio value="female"> Female </Radio>
            </Radio.Group>
          </Form.Item>


          <Form.Item label="Mobile Number">
            <Input value={mobileNumber} maxLength={10} minLength={10} onChange={(e) => { setMobileNumber(e.target.value) }} />
          </Form.Item>
          <Form.Item label="Upload" valuePropName="fileList">
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={submitLoading}> Submit </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Signup