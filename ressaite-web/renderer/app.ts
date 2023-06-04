// import { createSSRApp, defineComponent, h } from 'vue'
// import PageShell from './PageShell.vue'
// // import { setPageContext } from "./usePageContext";
// import type { PageContext } from './types'
// import { createPinia } from 'pinia'

// export { createApp }

// function createApp(pageContext: PageContext) {
//   const { Page, pageProps } = pageContext
//   const PageWithLayout = defineComponent({
//     render() {
//       return h(
//         PageShell,
//         {},
//         {
//           default() {
//             return h(Page, pageProps || {})
//           }
//         }
//       )
//     }
//   })

//   const app = createSSRApp(PageWithLayout)

//   // Make `pageContext` available from any Vue component
//   // setPageContext(app, pageContext);

//   // https://github.com/brillout/vite-plugin-ssr/blob/main/examples/vue-pinia/renderer/app.js
//   const store = createPinia()
//   app.use(store)

//   return app
// }

import { createPinia } from 'pinia'
import { createSSRApp, defineComponent, h, markRaw, reactive } from 'vue'
import { createI18n } from 'vue-i18n'

import i18nMessages from '@/i18n'
import '@/styles/main.scss'
import RstApp from '@/layout/RstApp.vue'
import type { PageContext } from './types'
import { setPageContext } from './usePageContext'

/**
 *
 * @param pageContext
 * @returns
 *
 * @see https://github.com/brillout/vite-plugin-ssr/blob/main/examples/vue-full/renderer/app.ts
 */
export function createApp(pageContext: PageContext) {
  const { Page } = pageContext

  // let rootComponent:  Component
  let rootComponent: any
  const PageWithWrapper = defineComponent({
    data: () => ({
      Page: markRaw(Page),
      pageProps: markRaw(pageContext.pageProps || {})
    }),
    created() {
      rootComponent = this
    },
    render() {
      return h(
        RstApp,
        {},
        {
          default: () => {
            return h(this.Page, this.pageProps)
          }
        }
      )
    }
  })

  const app = createSSRApp(PageWithWrapper)

  // https://github.com/brillout/vite-plugin-ssr/blob/main/examples/vue-pinia/renderer/app.js
  const store = createPinia()
  app.use(store)

  // https://vue-i18n.intlify.dev/guide/installation.html
  const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: i18nMessages
  })
  app.use(i18n)

  // We use `app.changePage()` to do Client Routing, see `_default.page.client.js`
  objectAssign(app, {
    changePage: (pageContext: PageContext) => {
      Object.assign(pageContextReactive, pageContext)
      rootComponent.Page = markRaw(pageContext.Page)
      rootComponent.pageProps = markRaw(pageContext.pageProps || {})
    }
  })

  // When doing Client Routing, we mutate pageContext (see usage of `app.changePage()` in `_default.page.client.js`).
  // We therefore use a reactive pageContext.
  const pageContextReactive = reactive(pageContext)

  // Make `pageContext` accessible from any Vue component
  setPageContext(app, pageContextReactive)

  return { app, store }
}

// Same as `Object.assign()` but with type inference
function objectAssign<Obj, ObjAddendum>(
  obj: Obj,
  objAddendum: ObjAddendum
): asserts obj is Obj & ObjAddendum {
  // @ts-ignore
  Object.assign(obj, objAddendum)
}
