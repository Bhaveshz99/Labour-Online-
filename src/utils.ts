import { notification } from 'antd'
export const getTokenPass = () => {
    return localStorage.getItem('token')
}

export let someThingWentWrongToast = () => {
    notification['error']({
        message: 'Something Went Wrong',
    });
}

export let errorToast = (msg: string,) => {
    notification['error']({
        message: msg,
    });
}

export let successToast = (msg: string,) => {
    notification['success']({
        message: msg,
    });
}