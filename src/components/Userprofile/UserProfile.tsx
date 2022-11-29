import React, { useEffect, useState } from 'react';
import { Avatar, Image, Radio, Card, Row, Col, Collapse, Form, Input, InputNumber, Select, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import "./userProfile.css"
const { Panel } = Collapse;
const UserProfile: React.FC = () => {

    const [email, setEmail] = useState<string>('');
    const [fullName, setFullName] = useState<string>('');
    const [mobile, setMobile] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [state, setState] = useState<string>('');
    const [pincode, setPincode] = useState<string>('');
    const [photo, setPhoto] = useState<string>('');
    const [price, setPrice] = useState<any>(200);
    const [serviceAreas, setServiceAreas] = useState<string[]>()
    const [gsLoading, setGsLoading] = useState<boolean>(false)
    const [wpLoading, setWpLoading] = useState<boolean>(false)


    useEffect(()=>{
        
    },[])

    const handleGeneralSettingsChange = () => {

    }

    const handleWorkProfileChanges = () => {

    }

    return (
        <div className="container">
            <div
                className="profile-nav-bg"
                style={{ backgroundImage: "url(./Assets/images/bg-profile.jpg)" }}
            ></div>

            <Card
                className="card-profile-head" style={{ boxShadow: "2px 12px 80px #bdbdbd" }}
                bodyStyle={{ display: "none" }}
                title={
                    <Row justify="space-between" align="middle" gutter={[24, 0]}>
                        <Col span={24} md={12} className="col-info">
                            <Avatar.Group>
                                <Avatar size={74} shape="square" src={"./Assets/avatar/avatar1.svg"} />
                                <div className="avatar-info">
                                    <h4 className="font-semibold m-0">Sarah Jacob</h4>
                                    <p>CEO / Co-Founder</p>
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
                                <Form.Item label='email'>
                                    <Input value={email} onChange={(e) => { setEmail(e.target.value) }} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} span={12} >
                                <Form.Item label='email'>
                                    <Input value={email} onChange={(e) => { setEmail(e.target.value) }} />
                                </Form.Item>

                            </Col>

                            <Col xs={24} sm={24} md={12} lg={12} span={12} >
                                <Form.Item label='Number'>
                                    <Input value={mobile} maxLength={10} minLength={10} onChange={(e) => { setMobile(e.target.value) }} />

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
                                    <Input value={state} onChange={(e) => { setPincode(e.target.value) }} />
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
                <Panel key='work' header={"work Settings"}>
                    <Form onFinish={handleWorkProfileChanges} >
                        <Row>
                            <Col xs={24} sm={24} md={12} lg={12} span={12} >
                                <Form.Item label='Price'>
                                    <InputNumber value={price} defaultValue={price} onChange={(e) => { setPrice(e) }} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} span={12} >
                                <Form.Item label='Areas'>
                                    <Select
                                        mode="multiple"
                                        allowClear
                                        style={{ width: '100%' }}
                                        placeholder="Select Areas"
                                        defaultValue={serviceAreas}
                                        onChange={(e) => {
                                            console.log(e);
                                        }}
                                        value={serviceAreas}
                                        options={[{ label: 'Ahmedabad', value: 'ahmedabad' }, { label: 'Surat', value: 'surat' },]}
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
                </Panel>

            </Collapse>
        </div >
    )
}

export default UserProfile