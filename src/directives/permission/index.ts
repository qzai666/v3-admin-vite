import { type Directive } from 'vue'
import { useUserStore } from '@/stores/user'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from '@/App.vue'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)

/** 权限指令，和权限判断函数 checkPermission 功能类似 */
export const permission: Directive = {
  mounted(el, binding) {
    const { value: permissionRoles } = binding
    const { roles } = useUserStore()
    if (Array.isArray(permissionRoles) && permissionRoles.length > 0) {
      const hasPermission = roles.some(role => permissionRoles.includes(role))
      // hasPermission || (el.style.display = "none") // 隐藏
      hasPermission || el.parentNode?.removeChild(el) // 销毁
    } else {
      throw new Error(`need roles! Like v-permission="['admin','editor']"`)
    }
  },
}
