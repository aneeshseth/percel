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
    console.log('resolved')
    console.log(resolvesTo)
    return proxy.web(req, res, { target: resolvesTo, changeOrigin: true })
})




app.get("/", (req, res) => {
    res.send("hello world!")
})


proxy.on('proxyReq', (proxyReq, req, res) => {
    const url = req.url;
    if (url === '/')
        console.log('p')
        proxyReq.path += 'index.html'
})


app.listen(8000, () => {
    console.log("server running.")
})