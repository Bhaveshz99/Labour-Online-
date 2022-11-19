import React from 'react';
import { Avatar, Image, Radio, Card, Row, Col } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import "./userProfile.css"

const UserProfile: React.FC = () => {

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
        </div>
    )
}

export default UserProfile