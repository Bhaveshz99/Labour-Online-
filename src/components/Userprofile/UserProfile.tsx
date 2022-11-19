import React from 'react';
import { Avatar, Image } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import "./userProfile.css"

const UserProfile: React.FC = () => {

    return (
        <div className="container">
            <div
                className="profile-nav-bg"
                style={{ backgroundImage: "url(./Assets/images/bg-profile.jpg)" }}
            ></div>
        </div>
    )
}

export default UserProfile