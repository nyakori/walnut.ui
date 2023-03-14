import axios, { AxiosInstance, AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';
import { signIn } from '../api/user';
import { useUserStore } from '../store/user';

const service: AxiosInstance = axios.create({
    timeout: 5000
});

service.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        // 如果已登录，则请求中附加token信息
        const token = localStorage.getItem('token');
        if (config && config.headers && token) {
            config.headers['W-Token'] = token;
        }

        return config;
    },
    (error: AxiosError) => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.status === 200) {
            // 若响应体中含有W-Token字段, 则更新本地token数据
            const headers = response.headers;
            if (headers['W-Token']) {
                localStorage.setItem('token', headers['W-Token']);
            }

            // 当响应为token过期时, 特殊处理
            const { code } = response.data;
            if (code === -2) {
                // 清空失效的token
                localStorage.removeItem('token');

                // 重新登录
                const user = useUserStore();
                signIn(user.getUsername(), user.getPassword()).then((res) => {
                    // 保存新token
                    const { data: { token } } = res.data;
                    localStorage.setItem('token', token);

                    // 重发请求
                    if (response.config.headers) {
                        response.config.headers['W-Token'] = token;
                    }
                    return axios.request(response.config);
                });
            }

            return response;
        } else {
            Promise.reject();
        }
    },
    (error: AxiosError) => {
        console.log(error);
        return Promise.reject();
    }
);

export default service;
