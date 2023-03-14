import { createApp } from 'vue';
import { createPinia } from 'pinia';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import App from './App.vue';
import router from './router';
import 'element-plus/dist/index.css';
import './assets/css/icon.css';
import { useRolesStore } from './store/roles';

const app = createApp(App);
app.use(createPinia());
app.use(router);

// 注册elementplus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

// 权限控制逻辑
const roles = useRolesStore();
app.directive('role', {
    mounted(el, binding) {
        if (!roles.isAdministrator() && !roles.hasRole(binding.value)) {
            el['hidden'] = true;
        }
    },
});

app.mount('#app');
