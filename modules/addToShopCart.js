const { json } = require('express');
const fs = require('fs');

module.exports = (json) =>{
    fs.appendFileSync(`${__dirname}/products/shopCart.json`, json + "\n")
}