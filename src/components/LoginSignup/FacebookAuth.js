import FacebookLogin from 'react-facebook-login';
import classes from './facebook.module.css';


export const FacebookAuth = (props) => {

    const responseFacebook = (response) => {
        if (response.status == "unknown") {

        }
        else console.log("🚀 ~ file: App.tsx:30 ~ responseFacebook ~ response", response)
    }
    return (
        <FacebookLogin
            appId={process.env.REACT_APP_FACEBOOK_APPID}
            autoLoad={true}
            cssClass={classes.login__btn}
            fields="name,email,picture"
            callback={responseFacebook}
            textButton="Login with Facebook"
        />
    )
}