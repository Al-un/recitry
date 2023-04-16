// import { createApp } from "./app";
// import type { PageContextClient } from "./types";

// export { render };

// async function render(pageContext: PageContextClient) {
//   const app = createApp(pageContext);
//   app.mount("#app");
// }

// /* To enable Client-side Routing:
// export const clientRouting = true
// // !! WARNING !! Before doing so, read https://vite-plugin-ssr.com/clientRouting */

import { createApp } from './app'
import { getPageTitle } from './getPageTitle'
import type { PageContext } from './types'
import type {
  //*
  // When using Client Routing https://vite-plugin-ssr.com/clientRouting
  PageContextBuiltInClientWithClientRouting as PageContextBuiltInClient
  /*/
  // When using Server Routing
  PageContextBuiltInClientWithServerRouting as PageContextBuiltInClient
  //*/
} from 'vite-plugin-ssr'

export const clientRouting = true
export const prefetchStaticAssets = { when: 'VIEWPORT' }
export { render }
export { onHydrationEnd }
export { onPageTransitionStart }
export { onPageTransitionEnd }

let app: ReturnType<typeof createApp>
async function render(pageContext: PageContextBuiltInClient & PageContext) {
  if (!app) {
    console.log("Client render, app content", pageContext)
    app = createApp(pageContext)
    app.mount('#app')
  } else {
    app.changePage(pageContext)
  }
  document.title = getPageTitle(pageContext)
}

function onHydrationEnd() {
  console.log('Hydration finished; page is now interactive.')
  document.querySelector('#app')!.classList.remove("hidden")
}
function onPageTransitionStart() {
  console.log('Page transition start')
  document.querySelector('.layout-page')!.classList.add('page-transition')
}
function onPageTransitionEnd() {
  console.log('Page transition end')
  document.querySelector('.layout-page')!.classList.remove('page-transition')
}
