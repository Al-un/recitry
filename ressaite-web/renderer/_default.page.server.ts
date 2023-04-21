// import { renderToString } from '@vue/server-renderer'
// import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr'
// import { createApp } from './app'
// import type { PageContextServer } from './types'

// export { render }
// // See https://vite-plugin-ssr.com/data-fetching
// export const passToClient = ['pageProps', 'urlPathname']

// async function render(pageContext: PageContextServer) {
//   const app = createApp(pageContext)
//   const appHtml = await renderToString(app)

//   // See https://vite-plugin-ssr.com/head
//   const { documentProps } = pageContext.exports
//   const title = (documentProps && documentProps.title) || 'Vite SSR app'
//   const desc = (documentProps && documentProps.description) || 'App using Vite + vite-plugin-ssr'

//   const documentHtml = escapeInject`<!DOCTYPE html>
//     <html lang="en">
//       <head>
//         <meta charset="UTF-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <meta name="description" content="${desc}" />
//         <title>${title}</title>
//       </head>
//       <body>
//         <div id="app">${dangerouslySkipEscape(appHtml)}</div>
//       </body>
//     </html>`

//   return {
//     documentHtml,
//     // pageContext: {
//     //   // We can add some `pageContext` here, which is useful if we want to do page redirection https://vite-plugin-ssr.com/page-redirection
//     // }
//   }
// }

import { renderToNodeStream, renderToString } from '@vue/server-renderer'
import { escapeInject } from 'vite-plugin-ssr/server'
import { createApp } from './app'
import { getPageTitle } from './getPageTitle'
import type { PageContext } from './types'
import type { PageContextBuiltIn } from 'vite-plugin-ssr'

export { passToClient }
export { render }

const passToClient = ['pageProps', 'documentProps']

async function render(pageContext: PageContextBuiltIn & PageContext) {
  const app = createApp(pageContext)
  // const stream = renderToNodeStream(app)
  const stream = await renderToString(app)

  const title = getPageTitle(pageContext)

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1">
        <title>${title}</title>
        <style>.hidden{display:none;}</style>
      </head>
      <body>
        <div id="app">${stream}</div>
      </body>
    </html>`

  return {
    documentHtml,
    pageContext: {
      enableEagerStreaming: true
    }
  }
}
