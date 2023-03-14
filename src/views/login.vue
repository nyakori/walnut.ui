<template>
	<div class="login-wrap">
		<div class="ms-login">
			<div class="ms-title">后台管理系统</div>
			<el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
				<el-form-item prop="username">
					<el-input v-model="param.username" placeholder="username">
						<template #prepend>
							<el-button :icon="User"></el-button>
						</template>
					</el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input type="password" placeholder="password" v-model="param.password"
						@keyup.enter="submitForm(login)">
						<template #prepend>
							<el-button :icon="Lock"></el-button>
						</template>
					</el-input>
				</el-form-item>
				<div class="login-btn">
					<el-button type="primary" @click="submitForm(login)">登录</el-button>
				</div>
				<p class="login-tips">OS : 不想写代码啦。</p>
			</el-form>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useTagsStore } from '../store/tags';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import { Lock, User } from '@element-plus/icons-vue';
import { signIn } from '../api/user'
import { useUserStore } from '../store/user';
import { useRolesStore } from '../store/roles';

// el-form节点
const login = ref<FormInstance>();

// 窗口校验规则
const rules: FormRules = {
	username: [
		{
			required: true,
			message: '请输入用户名',
			trigger: 'blur'
		}
	],
	password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
};

// 定义登陆信息
interface LoginInfo {
	username: string;
	password: string;
}
const param = reactive<LoginInfo>({
	username: '',
	password: ''
});

// 定义路由器 - 由于生存期问题, 此定义必须放在外边
const router = useRouter();

// 表单提交函数
const submitForm = (formEl: FormInstance | undefined) => {
	// 表单判空
	if (!formEl) return;

	// 表单校验
	formEl.validate((valid: boolean) => {
		if (valid) {
			// 登陆api
			signIn(param.username, param.password).then(res => {
				const { code, message, data } = res.data;
				switch (code) {
					case 0:
						// 读取token
						const { roles, token } = data;

						// 记录token
						localStorage.setItem('token', token);

						// 存放信息商店
						useUserStore().setUser(param.username, param.password);
						useRolesStore().setRoles(roles);

						// 重定向到根目录
						router.push('/');

						return;

					default:
						ElMessage.error(message);
						break;
				}
			}).catch(() => {
				ElMessage.error('接口调用失败');
				return false;
			});
		} else {
			ElMessage.error('登录信息错误');
			return false;
		}
	});
};

const tags = useTagsStore();
tags.clearTags();
</script>

<style scoped>
.login-wrap {
	position: relative;
	width: 100%;
	height: 100%;
	background-image: url(../assets/img/login-bg.jpg);
	background-size: 100%;
}

.ms-title {
	width: 100%;
	line-height: 50px;
	text-align: center;
	font-size: 20px;
	color: #fff;
	border-bottom: 1px solid #ddd;
}

.ms-login {
	position: absolute;
	left: 50%;
	top: 50%;
	width: 350px;
	margin: -190px 0 0 -175px;
	border-radius: 5px;
	background: rgba(255, 255, 255, 0.3);
	overflow: hidden;
}

.ms-content {
	padding: 30px 30px;
}

.login-btn {
	text-align: center;
}

.login-btn button {
	width: 100%;
	height: 36px;
	margin-bottom: 10px;
}

.login-tips {
	font-size: 12px;
	line-height: 30px;
	color: #fff;
}
</style>
