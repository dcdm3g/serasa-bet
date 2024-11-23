import { createServer } from 'node:http'
import { parse, fileURLToPath } from 'node:url'
import { join, dirname, resolve } from 'node:path'
import { readFile } from 'node:fs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

function contentTypeFromExtension(ext) {
  const contentTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/js',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp'
  }

  return contentTypes[ext]
}

async function serve(pathname, response) {
  const pub = join(root, '/public')
  const match = pathname.match(/\.[a-z]+$/)
  const ext = match?.[0] ?? '.html'
  
  const path = match
    ? join(pub, pathname) 
    : join(pub, pathname + '.html')

  readFile(path, (err, data) => {
    if (err) {
      readFile(join(pub, 'not-found.html'), (err, data) => {
        if (err) {
          response.writeHead(500, { 'Content-Type': 'text/plain' })
          return response.end('Internal Server Error')
        }

        response.writeHead(404, { 'Content-Type': 'text/html' })
        return response.end(data)
      })
    } else {
      response.writeHead(200, { 'Content-Type': contentTypeFromExtension(ext) })
      return response.end(data)
    }
  })
}

const server = createServer(async (request, response) => {
  const { pathname } = parse(request.url)

  if (!/^(\/assets|\/scripts|\/styles)/.test(pathname)) {
    const isAuthenticated = false
    const isAuthenticationRoute = ['/login', '/register'].includes(pathname)

    if (!isAuthenticated && !isAuthenticationRoute) {
      response.writeHead(301, { location: '/login' })
      return response.end()
    }
  
    if (isAuthenticated && isAuthenticationRoute) {
      response.writeHead(301, { location: '/' })
      return response.end()
    }
  }

  return await serve(pathname, response)
})

server.listen(3000, '0.0.0.0', () => {
  console.log('Listening on http://0.0.0.0:3000')
})
