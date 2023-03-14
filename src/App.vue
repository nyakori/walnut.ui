<template>
    <el-config-provider :locale="zhCn">
        <router-view />
    </el-config-provider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import { onMounted, ref } from 'vue-demi';

/**
 * 关闭窗口时清空本地缓存
 */
onMounted(() => {
    // 执行操作前锚定时间点
    window.addEventListener('beforeunload', () => {
    });

    // 执行操作时进行逻辑判断
    window.addEventListener('unload', () => {
    });
});
</script>

<style>
@import './assets/css/main.css';
@import './assets/css/color-dark.css';
</style>
