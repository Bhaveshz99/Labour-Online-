import React, { useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import './signup.scss';
import { callPost } from '../../services/Apis';
import { IUser } from '../../interfaces/user';
import { Button, message } from 'antd';
import { useNavigate } from "react-router-dom";

interface googleAuth {
    googleWith: string,
    role?: string
}

const GoogleAuth: React.FC<googleAuth> = ({ googleWith, role }) => {

    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const messagePopup = (type: any, content: string) => {
        messageApi.open({
            type,
            content
        });
    };

    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'This is an error message',
        });
    };

    const clientId: string = process.env.REACT_APP_GOOGLE_KEY || '';

    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: ''
            });
        };
        gapi.load('client:auth2', initClient);
    }, []);

    const onSuccess = async (res: any) => {
        console.log('🚀 ~ file: GoogleAuth.tsx:26 ~ onSuccess ~ res', res?.profileObj
        );
        let googleUser: any = res?.profileObj;
        const Obj = {
            userName: googleUser?.givenName,
            fullName: googleUser?.givenName,
            email: googleUser?.email,
            avatar: googleUser?.imageUrl
        } as IUser;
        if (googleWith == "Login") {
            await callPost('/user/socialLogin', Obj).then((data: any) => {
                // messagePopup('success', 'Login success fully');
                navigate('/');
            }).catch((error: any) => {
                console.log('🚀 ~ file: GoogleAuth.tsx:50 ~ awaitcallPost ~ error', error);
                messagePopup('error', 'This is an error message');
            })
        } else {
            // Obj.role = role;
            await callPost('/user/socialSignup', Obj).then((data: any) => {
                // messagePopup('success', 'Signup success fully');
                navigate('/');
            }).catch((error: any) => {
                messagePopup('error', error.message);
            })
        }
    };
    const onFailure = (err: any) => {
        console.log('failed:', err);
    };

    return (<><GoogleLogin
        clientId={clientId}
        render={renderProps => (
            <div className='googleBtnPo'>
                <div onClick={renderProps.onClick} className="google-btn">
                    <div className="google-icon-wrapper">
                        <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
                    </div>
                    <p className="btn-text"><b>{googleWith} in with google</b></p>
                </div>
            </div>
        )}
        // buttonText="Sign in with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
    />
        <button onClick={error}>Message</button></>);
}

export default GoogleAuth;