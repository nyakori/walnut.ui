/*********************************************************
 * File: sidebar.ts
 * Created Date: 2023-03-13
 * Author: walnut(覃鹏展)
 * 
 * Description:
 * 	商品：
 * 		1. 侧边栏折叠状态
 * 	功能：
 * 		1. 控制侧边栏状态
 * 
 * Copyright (C) 2023 襄阳市中心医院
 *********************************************************/

import { defineStore } from 'pinia';

export const useSidebarStore = defineStore('sidebar', {
	state: () => {
		return {
			collapse: false
		};
	},
	getters: {},
	actions: {
		handleCollapse() {
			this.collapse = !this.collapse;
		}
	}
});
