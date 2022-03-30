import { createApp } from 'vue'
import WorkTracker from './WorkTracker.vue'
import ClickOutside from './directives/click-outside'

createApp(WorkTracker).directive('click-outside', ClickOutside).mount('#app')
