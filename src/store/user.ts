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

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            username: '',
            password: ''
        }
    },
    actions: {
        setUsername(username: string) {
            this.username = username;
        },
        getUsername() {
            return this.username ? this.username : '';
        },
        setPassword(password: string) {
            this.password = password;
        },
        getPassword() {
            return this.password ? this.password : '';
        }
    }
});