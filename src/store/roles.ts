/*********************************************************
 * File: roles.ts
 * Created Date: 2023-03-14
 * Author: walnut(覃鹏展)
 * 
 * Description:
 *  商品：
 *      1. 当前用户角色列表
 *  功能：
 *      1. 根据权限过滤侧边栏
 * 
 * Copyright (C) 2023 襄阳市中心医院
 *********************************************************/

import { defineStore } from 'pinia'

export const useRolesStore = defineStore('roles', {
    state: () => {
        return {
            roles: <string[]>[]
        }
    },
    actions: {
        clearRoles() {
            this.roles = <string[]>[];
        },
        setRoles(roles: string[]) {
            this.roles = roles;
        },
        isAdministrator() {
            return this.roles.includes('admin');
        },
        hasRole(role: string) {
            return this.roles.includes(role);
        }
    }
});