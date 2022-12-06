import FacebookLogin from 'react-facebook-login';

export const FacebookAuth = () => {

    const responseFacebook = (response) => {
        console.log("🚀 ~ file: App.tsx:30 ~ responseFacebook ~ response", response)
    }
    return (
        <>
            <FacebookLogin
                appId="1778489199191523"
                autoLoad={true}
                fields="name,email,picture"
                callback={responseFacebook}
                textButton="Login with Facebook"
            />
        </>
    )
}