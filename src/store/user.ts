/*********************************************************
 * File: user.ts
 * Created Date: 2023-03-13
 * Author: walnut(覃鹏展)
 * 
 * Description:
 *  定义存储登陆信息的store
 * 
 * Copyright (C) 2023 襄阳市中心医院
 *********************************************************/

import { defineStore } from 'pinia'
import { reactive } from 'vue';

interface UserInfo {

}

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
        },
    }
});