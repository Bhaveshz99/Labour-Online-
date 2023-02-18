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

    interface userSignup {
        userName: string
        fullName: string
        email: string
        role?: string
    }

    const responseGoogleSuccess = async (res: any) => {
        let googleUser: any = res?.profileObj;
        const Obj: userSignup = {
            userName: googleUser?.givenName,
            fullName: googleUser?.givenName,
            email: googleUser?.email
        };
        if (googleWith == "Login") {
            await callPost('/user/socialLogin', Obj).then((data: any) => {
                // messagePopup('success', 'Login success fully');
                navigate('/');
            }).catch((error: any) => {
                messagePopup('error', 'This is an error message');
            })
        } else {
            Obj.role = role
            await callPost('/user/socialSignup', Obj).then((data: any) => {
                // messagePopup('success', 'Signup success fully');
                navigate('/');
            }).catch((error: any) => {
                messagePopup('error', error.message);
            })
        }
    };
    const responseGoogleError = (err: any) => {
    };

    return (<>
        {/* <GoogleLogin
            clientId={clientId}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            render={renderProps => (
                <button onClick={renderProps.onClick} className='googleBtnPo' >
                    <div className={"google-btn disable"} >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_" />
                        </div>
                        <p className="btn-text"><b>{googleWith} in with google</b></p>
                    </div>
                </button>
                // <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
            )}
            cookiePolicy={'single_host_origin'}
        /> */}
        <GoogleLogin
            //  className={renderProps.disabled ? "google-btn disable" : "google-btn"}
            clientId={clientId}
            render={renderProps => (
                <button onClick={() => renderProps.onClick()} className='googleBtnPo'>
                    <div className="google-btn">
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
                        </div>
                        <p className="btn-text"><b>{googleWith} in with google</b></p>
                    </div>
                </button>
            )}
            // buttonText="Sign in with Google"
            onSuccess={responseGoogleSuccess}
            onFailure={responseGoogleError}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
        />
    </>
    );
}

export default GoogleAuth;