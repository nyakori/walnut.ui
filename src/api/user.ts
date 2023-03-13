import request from '../utils/request'

export const signIn = (username: string, password: string) => {
    return request({
        baseURL: 'http://172.16.100.252:8080',
        url: '/api/user/signIn',
        method: 'post',
        data: {
            username: username,
            password: password
        }
    });
}