import { createServer } from 'node:http'
import { parse, fileURLToPath } from 'node:url'
import { join, dirname } from 'node:path'
import { readFile } from 'node:fs'

const root = dirname(fileURLToPath(import.meta.url))

const mimeTypes = {
  'html': 'text/html',
  'css': 'text/css',
  'js': 'text/javascript',
  'svg': 'image/svg+xml',
  'webp': 'image/webp'
}

function file(pathname, response) {
  const path = join(root, pathname)
  const extension = pathname.split('.')[1]

  readFile(path, (err, data) => {
    if (err) {
      response.writeHead(404, { 'Content-Type': 'text/plain' })
      response.end('NOT_FOUND')
    }

    response.writeHead(200, { 'Content-Type': mimeTypes[extension] })
    return response.end(data)
  })
}

function page(pathname, response) {
  const path = join(root, '/pages', pathname + '.html')
  console.log(path)

  readFile(path, (err, data) => {
    if (err) {
      response.writeHead(404, { 'Content-Type': 'text/plain' })
      return response.end('NOT_FOUND')
    } else {
      response.writeHead(200, { 'Content-Type': 'text/html' })
      return response.end(data)
    }
  })
}

const server = createServer(async (request, response) => {
  const { pathname } = parse(request.url)
  console.log(pathname)

  if (pathname.startsWith('/static')) {
    return file(pathname, response)
  }

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

  return page(pathname, response)
})

server.listen(3000, '0.0.0.0', () => {
  console.log('Listening on http://0.0.0.0:3000')
})