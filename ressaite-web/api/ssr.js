import { renderPage } from 'vite-plugin-ssr/server'

/**
 * Vercel serverless functions must be in the `<root>/api/` folder
 * 
 * @see https://vercel.com/docs/concepts/functions/serverless-functions#adding-utility-files-to-the-/api-directory
 */
export default async function handler(req, res) {
  const { url } = req
  console.log('Request to url:', url)

  const pageContextInit = { urlOriginal: url }
  const pageContext = await renderPage(pageContextInit)
  const { httpResponse } = pageContext

  if (!httpResponse) {
    res.statusCode = 200
    res.end()
    return
  }

  const { body, statusCode, contentType } = httpResponse
  res.statusCode = statusCode
  console.log("responding content-type", contentType)
  res.setHeader('content-type', contentType)
  // res.setHeader('content-type', 'text/html')
  res.end(body)
}
