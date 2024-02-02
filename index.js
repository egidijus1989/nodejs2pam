const http = require('http');
const url = require('url');
const fs = require('fs');
const replaceTemplate = require('./modules/replaceTemplate.js')
const data = fs.readFileSync(`${__dirname}/products/products.json`, 'utf-8')
const products = JSON.parse(data)
const addToShopCart = require(`${__dirname}/modules/addToShopCart.js`)

/////////////////////Templates//////////////////////////////////

const main = fs.readFileSync(`${__dirname}/templates/main.html`, 'utf-8')
const card = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8')
const product = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8')

////////////////////Server///////////////////////////

const host = 'localhost'
const port = '8888'

////////////////////////////////////////////////////

const server = http.createServer((req, res) =>{
  const {query, pathname}=url.parse(req.url, true)

  switch(pathname){
    case '/':
      const cardshtml = products.map((el)=>
        replaceTemplate(card, el)
      )
      const output = main.replace(`{%PRODUCT_CARDS%}`, cardshtml.join(""))
      res.writeHead(200, {
        'Content-Type': 'text/html'
      })
      res.end(output)
      break;
/////////////////////////////////////////////////////////////////////////////
    case "/product":
      res.writeHead(200, {
        'Content-Type': 'text/html'
      })
      const outputProduct = replaceTemplate(product, products[query.id -1])
      res.end(outputProduct)
      break
/////////////////////////////////////////////////////////////////////////////
    case "/addProduct":
      res.writeHead(200, {
        'Content-Type': 'text/html'
      })
      
      res.end();
      break;
/////////////////////////////////////////////////////////////////////////////
    default:
      res.writeHead(404, {
        'Content-Type': 'text/html'
      })
      res.end('<h1>Page not found</h1>')
  }
})


server.listen(port, host, ()=>{
  console.log(`Server listening on port ${port}`)
})