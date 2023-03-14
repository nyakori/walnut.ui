/*********************************************************
 * File: user.ts
 * Created Date: 2023-03-13
 * Author: walnut(覃鹏展)
 * 
 * Description:
 *  商品：
 *      1. 用户名
 *      2. 登录密码
 *  功能：
 *      1. 在token过期后，自动发起登录
 * 
 * Copyright (C) 2023 襄阳市中心医院
 *********************************************************/

import { defineStore } from 'pinia'
import { reactive } from 'vue';

interface SignInfo {
    username: string;
    password: string;
}

export const useUserStore = defineStore('user', {
    state: () => {
        const signInfoString = localStorage.getItem('signInfo');
        return {
            signInfo: signInfoString ? <SignInfo>JSON.parse(signInfoString) : reactive<SignInfo>({ username: '', password: '' })
        }
    },
    actions: {
        setUser(username: string, password: string) {
            this.signInfo.username = username;
            this.signInfo.password = password;
            localStorage.setItem('signInfo', JSON.stringify(this.signInfo));
        },
        getUsername() {
            return this.signInfo.username;
        },
        getPassword() {
            return this.signInfo.password;
        }
    }
});