import FacebookLogin from 'react-facebook-login';

export const FacebookAuth = (props) => {

    const responseFacebook = (response) => {
        console.log("🚀 ~ file: App.tsx:30 ~ responseFacebook ~ response", response)
    }
    return (
        <>
            <FacebookLogin
                appId={process.env.REACT_APP_FACEBOOK_APPID}
                autoLoad={true}
                fields="name,email,picture"
                callback={responseFacebook}
                textButton="Login with Facebook"
            />
        </>
    )
}