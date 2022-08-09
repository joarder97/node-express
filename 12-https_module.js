const http = require('http')

const server = http.createServer((req, res)=>{
    if(req.url === '/') {
        res.end('welcome to the homepage')
    }
    if(req.url === '/about') {
        res.end('Welcome to the about page')
    }
    res.end(
        `<h1>Oppssss<h1>
        <a href='/'>Home</a>`
    )
})

server.listen(5000)