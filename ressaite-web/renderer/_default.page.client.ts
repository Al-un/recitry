// When using Client Routing https://vite-plugin-ssr.com/clientRouting,
// otherwise, use "PageContextBuiltInClientWithServerRouting as PageContextBuiltInClient"
// when using Server routing
import type { PageContextBuiltInClientWithClientRouting as PageContextBuiltInClient } from 'vite-plugin-ssr'

import { createApp } from './app'
import { getPageTitle } from './getPageTitle'
import type { PageContext } from './types'

import '@/styles/main.scss'

export const clientRouting = true
export const prefetchStaticAssets = { when: 'VIEWPORT' }

// let app: ReturnType<typeof createApp>
let app: any;
export async function render(pageContext: PageContextBuiltInClient & PageContext) {
  if (!app) {
    console.log('Client render, app content', pageContext.Page)
    app = createApp(pageContext).app
    app.mount('#app')
  } else {
    app.changePage(pageContext)
  }
  document.title = getPageTitle(pageContext)
}

export function onHydrationEnd() {
  console.log('Hydration finished; page is now interactive.')
  document.querySelector('#app')!.classList.remove('hidden')
}

export function onPageTransitionStart() {
  console.log('Page transition start')
  document.querySelector('#app')!.classList.add('page-transition')
}

export function onPageTransitionEnd() {
  console.log('Page transition end')
  document.querySelector('#app')!.classList.remove('page-transition')
}
