import React, { useState } from 'react';
import { Avatar, Image, Radio, Card, Row, Col, Collapse, Form, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import "./userProfile.css"
const { Panel } = Collapse;
const UserProfile: React.FC = () => {
    
    const[email,setEmail] = useState<string>('');
    const[mobile,setMobile] = useState<string>('');
    const[gender,setGender] = useState<string>('');
    const[city,setCity] = useState<string>('');
    const[state,setState] = useState<string>('');
    const[photo,setPhoto] = useState<string>('');
    // const[email,set] = useState<string>('');

    const handleOnChnage = () => {

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
            <Collapse defaultActiveKey={['1']} onChange={handleOnChnage}>
                <Panel key='general' header={"General Settings"}>
                    <Form >
                        <Form.Item>
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Input />
                        </Form.Item>
                        
                    </Form>
                </Panel>
                <Panel key='work' header={"work Settings"}>
                    <Form >
                        <Input />
                    </Form>
                </Panel>

            </Collapse>
        </div>
    )
}

export default UserProfile