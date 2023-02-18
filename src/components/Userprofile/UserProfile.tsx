import React, { useEffect, useState } from 'react';
import { Avatar, Image, Radio, Card, Row, Col, Collapse, Form, Input, InputNumber, Select, Button, Space } from 'antd';
import "./userProfile.css"
import { useSelector, useDispatch } from "react-redux";
import { UserProps } from '../../interfaces/user'
// import rootReducer from '../../Redux/store';
import { Spin, message, Upload } from 'antd';
import { callPost, callPut } from '../../services/Apis';
import { editUser } from '../../Redux/slices/authSlice';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import type { UploadChangeParam } from 'antd/es/upload';
import { LoadingOutlined, PlusOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import cityJson from './city.json';
const { Panel } = Collapse;

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

const UserProfile: React.FC<UserProps> = (props: UserProps) => {

    const user = useSelector((store: any) => store.user[0])
    const dispatch = useDispatch();

    const [email, setEmail] = useState<string>('');
    const [fullName, setFullName] = useState<string>('');
    const [mobile, setMobile] = useState<number>();
    const [gender, setGender] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [state, setState] = useState<string>('');
    const [pincode, setPincode] = useState<string>('');
    const [photo, setPhoto] = useState<string>('');
    const [price, setPrice] = useState<number>();
    const [serviceAreaId, setServiceAreaId] = useState<any>([]);
    const [gsLoading, setGsLoading] = useState<boolean>(false)
    const [wpLoading, setWpLoading] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true);
    const [workShip, setWorkShip] = useState<boolean>(user?.role === 'user' ? false : true);
    // const [workShip, setWorkShip] = useState<boolean>(true);
    const [updateProfilePic, setupdateProfilePic] = useState<boolean>(false)
    const [imgLoading, setImgLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();
    const [password, setPassword] = useState<string>('');
    const [conPassword, setConPassword] = useState<string>('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    console.log("🚀 ~ file: UserProfile.tsx:50 ~ fileList", fileList)

    const [messageApi, contextHolder] = message.useMessage();

    const baseUrl = process.env.REACT_APP_BASE_URL;
    useEffect(() => {
        if (user) {
            setEmail(user?.email);
            setFullName(user?.fullName);
            setMobile(user?.mobile);
            setGender(user?.gender);
            setCity(user?.city);
            setState(user?.state);
            setPincode(user?.pincode);
            setPhoto(`${process.env.REACT_APP_BASE_URL}/${user?.avatar}`);
            setPrice(user?.price);
            setServiceAreaId(user?.serviceAreaId.map((item: any) => item?.name))
            setLoading(false)
        } else {
            setLoading(true)
        }
    }, [user])

    const sendMessage = (messageType: any, content: string) => {
        messageApi.open({
            type: messageType,
            content,
        });
    }

    const handleGeneralSettingsChange = () => {
        const Obj: any = {
            fullName,
            email,
            mobile,
            gender,
            state,
            city,
            pincode
        }
        fileList.length && (Obj.avatar = fileList[0]?.thumbUrl);
        // avatar
        callPut('/user/update', Obj).then((res: any) => {
            dispatch(editUser(res?.data?.data))
            sendMessage('success', 'User profile updated successFully')
        }).catch((error: any) => {
            sendMessage('error', "Enter a valid data")
        })
    }

    const handleWorkProfileChanges = () => {
        const Obj: any = {
            price
        }
        serviceAreaId.length > 0 && (Obj.serviceAreaId = serviceAreaId)
        callPut('/user/update', Obj).then((res: any) => {
            dispatch(editUser(res?.data?.data))
            sendMessage('success', 'User profile updated successFully')
        }).catch((error: any) => {
            sendMessage('error', error.message)
        })
    }

    const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => setFileList(newFileList);

    const uploadButton = (
        <div>
            {imgLoading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    // uplaod image

    const handleSavePassword = () => {
        if (!password && !conPassword) {
            sendMessage('error', 'Password are required');
        }
        else if (password.length < 8 && conPassword.length < 8) {
            sendMessage('error', 'Password must be 8 character');
        }
        else if (password && conPassword && password === conPassword) {
            callPost('/user/savePassword', { password }).then((res) => {
                sendMessage('success', 'Password same successfully');
            }).catch((error) => {
                sendMessage('error', error.message);
            })
        } else {
            sendMessage('error', 'Passwords fields are not same');
        }
    }

    return (
        <div className="container">
            {contextHolder}
            <div
                className="profile-nav-bg"
                style={{ backgroundImage: "url(./Assets/images/bg-profile.jpg)" }}
            ></div>
            <Spin size="large" spinning={loading} delay={500}>
                <Card
                    className="card-profile-head" style={{ boxShadow: "2px 12px 80px #bdbdbd" }}
                    bodyStyle={{ display: "none" }}
                    title={
                        <Row justify="space-between" align="middle" gutter={[24, 0]}>
                            <Col span={24} md={12} className="col-info">
                                <Avatar.Group>
<<<<<<< HEAD
                                    <Avatar style={{ marginRight: "10px" }} size={74} shape="square" src={<Image src={`${baseUrl}/${user?.avatar}` || "./Assets/avatar/avatar1.svg"} />} />
=======
                                    <Avatar style={{ marginRight: "10px" }} size={74} shape="square" src={<Image src={`${process.env.REACT_APP_BASE_URL}/${user?.avatar}`} />} />
                                    {/* <Avatar style={{ marginRight: "10px" }} size={74} shape="square" src={<Image src={"./Assets/avatar/avatar1.svg"} />} /> */}
>>>>>>> a7677b389573f57166ce2c9b1186ea38bff63f9a
                                    {/* "./Assets/avatar/avatar1.svg" */}
                                    {/* <Avatar size={74} shape="square" src={"./Assets/avatar/avatar1.svg"} /> */}
                                    <div>

                                        {!updateProfilePic ? <Button onClick={() => setupdateProfilePic(true)}>Update profile pic</Button> :
                                            <Upload
                                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                                listType="picture-card"
                                                onChange={handleChange}
                                            >
                                                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : (fileList.length >= 1 ? null : uploadButton)}
                                            </Upload>}
                                    </div>
                                    <div className="avatar-info">
                                        <h4 className="font-semibold m-0">{user?.fullName}</h4>
                                        {/* <p>CEO / Co-Founder</p> */}
                                    </div>
                                </Avatar.Group>
                            </Col>
                            <Col
                                span={24}
                                md={12}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "flex-end",
                                }}
                            >
                            </Col>
                        </Row>
                    }
                ></Card>
                <Collapse defaultActiveKey={['general']} >
                    <Panel key='general' header={"General Settings"} >
                        <Form onFinish={handleGeneralSettingsChange} >
                            <Row gutter={[8, 8]}>
                                <Col xs={24} sm={24} md={12} lg={12} span={12} >
                                    <Form.Item label='Full Name'>
                                        <Input value={fullName} onChange={(e: any) => { setFullName(e.target.value) }} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={12} span={12} >
                                    <Form.Item label='Email'>
                                        <Input value={email} onChange={(e: any) => { setEmail(e.target.value) }} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={12} span={12} >
                                    <Form.Item label='Mobile'>
                                        <InputNumber style={{ width: '50%' }} value={mobile} type="number" maxLength={10} minLength={10} onChange={(value: any) => setMobile(value)} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={12} span={12} >
                                    <Form.Item label='Gender'>
                                        <Radio.Group value={gender} className='role_selection' onChange={(e) => { setGender(e.target.value) }}>
                                            <Radio value="male"> Male </Radio>
                                            <Radio value="female"> Female </Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={12} span={12} >
                                    <Form.Item label='State'>
                                        <Input value={state} onChange={(e) => { setState(e.target.value) }} />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={24} md={12} lg={12} span={12} >
                                    <Form.Item label='City'>
                                        <Input value={city} onChange={(e) => { setCity(e.target.value) }} />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={24} md={12} lg={12} span={12} >
                                    <Form.Item label='Pincode'>
                                        <Input value={pincode} type="number" onChange={(e) => { setPincode(e.target.value) }} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item>
                                <div>
                                    <Button onClick={handleGeneralSettingsChange} size='large' loading={gsLoading}> Submit </Button>
                                </div>
                            </Form.Item>
                        </Form>
                    </Panel>
                    {workShip && <Panel key='work' header={"work Settings"}>
                        <Form onFinish={handleWorkProfileChanges} >
                            <Row>
                                <Col xs={24} sm={24} md={12} lg={12} span={12} >
                                    <Form.Item label='Price'>
                                        <InputNumber value={price} onChange={(value: any) => setPrice(value)} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={12} span={12} >
                                    <Form.Item label='Areas'>
                                        <Select
                                            mode="tags"
                                            placeholder="Please select"
                                            onChange={(value: string[]) => setServiceAreaId(value)}
                                            style={{ width: '100%' }}
                                            value={serviceAreaId}
                                            options={cityJson}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item>
                                <div>
                                    <Button onClick={handleWorkProfileChanges} size='large' loading={wpLoading}> Submit </Button>
                                </div>
                            </Form.Item>
                        </Form>
                    </Panel>}

                    {/* {!user?.password &&  */}
                    <Panel key='password' header={"Save Password"}>
                        <Space direction="vertical">
                            <Form.Item>
                                <Input.Password
                                    style={{ borderRadius: '6px' }}
                                    size="small"
                                    placeholder="input password"
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Input.Password
                                    style={{ marginTop: '10px', borderRadius: '6px' }}
                                    size="small"
                                    placeholder="input password"
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                    onChange={(e) => setConPassword(e.target.value)}
                                />
                                <div>
                                    <Button style={{ marginTop: '20px' }} onClick={handleSavePassword} size='large' > Save password </Button>
                                </div>

                            </Form.Item>
                        </Space>
                    </Panel>
                    {/* } */}
                </Collapse>

            </Spin >
        </div >
    )
}

export default UserProfile