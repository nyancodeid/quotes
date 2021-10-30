import { ViteSSG } from 'vite-ssg'
import { routes } from './router'
import App from './App.vue'

import './styles/tailwind.css'

export const createApp = ViteSSG(App, { routes })
