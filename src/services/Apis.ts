import axios from "axios";

const token: any = localStorage.getItem('token');

const config: any = {
    headers: { Authorization: `Bearer ${token}` }
};

const baseUrl = process.env.BASE_URL || 'http://localhost:8080';
console.log('🚀 ~ file: Apis.ts ~ line 10 ~ baseUrl', baseUrl);

export const callGet = (path: string) => {
    return new Promise(async (resolve, reject) => {
        await axios.get(`${baseUrl}${path}`, config).then((result: any) => resolve(result)).catch((error: any) => reject(error));
    })
}

export const callPost = (path: string, body: any) => {
    return new Promise(async (resolve, reject) => {

        await axios.post(`${baseUrl}${path}`, body, config).then((result: any) => resolve(result)).catch((error: any) => reject(error));
    })
}

export const callPut = (path: string, body: any) => {
    return new Promise(async (resolve, reject) => {
        await axios.put(`${baseUrl}${path}`, body, config).then((result: any) => resolve(result)).catch((error: any) => reject(error));
    })
}

export const callDelete = (path: string) => {
    return new Promise(async (resolve, reject) => {
        await axios.delete(`${baseUrl}${path}`, config).then((result: any) => resolve(result)).catch((error: any) => reject(error));
    })
}
