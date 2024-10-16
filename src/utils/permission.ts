import { useUserStore } from '@/stores/user'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from '@/App.vue'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)

/** 全局权限判断函数，和权限指令 v-permission 功能类似 */
export const checkPermission = (permissionRoles: string[]): boolean => {
  if (Array.isArray(permissionRoles) && permissionRoles.length > 0) {
    const { roles } = useUserStore()
    return roles.some(role => permissionRoles.includes(role))
  } else {
    console.error("need roles! Like checkPermission(['admin','editor'])")
    return false
  }
}
