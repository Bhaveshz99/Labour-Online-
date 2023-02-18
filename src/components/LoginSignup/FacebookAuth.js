// import FacebookLogin from 'react-facebook-login';
import { FacebookFilled, AppleFilled } from '@ant-design/icons';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import './facebook.css';
import { callPost } from '../../services/Apis';
import { IUser } from '../../interfaces/user';
import { Button, message } from 'antd';
import { useNavigate } from "react-router-dom";


export const FacebookAuth = ({ googleWith }) => {

    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const messagePopup = (type, content) => {
        messageApi.open({
            type,
            content
        });
    };

    const responseFacebook = async (response) => {
        const Obj = {
            userName: response?.name,
            fullName: response?.name,
            email: response?.emails
        };
        if (googleWith == "Login") {
            await callPost('/user/socialLogin', response).then((data) => {
                // messagePopup('success', 'Login success fully');
                navigate('/');
            }).catch((error) => {
                // messagePopup('error', error.message);
            })
        } else {
            // Obj.role = "user"
            await callPost('/user/socialSignup', Obj).then((data) => {
                // messagePopup('success', 'Signup success fully');
                navigate('/');
            }).catch((error) => {
                // messagePopup('error', error.message);
            })
        }
    }
    return (
        <FacebookLogin
            appId={process.env.REACT_APP_FACEBOOK_APPID}
            autoLoad={true}
            // cssClass={classes.faceBook_btn}
            fields="name,email,picture"
            textButton="Login with Facebook"
            icon="fa-facebook"
            render={renderProps => (
                <div className="container">
                    <span onClick={renderProps.onClick} className="btn btn-lg btn-social btn-facebook">
                        <FacebookFilled />
                        {googleWith} in with Facebook
                    </span>
                </div>
            )}
            callback={responseFacebook}
        />
    )
}