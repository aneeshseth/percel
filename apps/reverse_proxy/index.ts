import express, {Request, Response} from 'express'
import httpProxy from 'http-proxy'
const app = express()

const BASE_PATH = 'https://perceldeploymentfiles.s3.amazonaws.com/__outputs'

const proxy = httpProxy.createProxy()

app.use((req, res) => {
    const hostname = req.hostname;
    console.log(hostname)
    const subdomain = hostname.split('.')[0];
    console.log(subdomain)
    const resolvesTo = `${BASE_PATH}/${subdomain}`
    return proxy.web(req, res, { target: resolvesTo, changeOrigin: true })
})

proxy.on('proxyReq', (proxyReq, req, res) => {
    const url = req.url;
    if (url === '/')
        proxyReq.path += 'index.html'
})

app.listen(8000, () => {
    console.log("server running.")
})