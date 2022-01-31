const express = require('express')
const consign = require('consign')
const bodyParser = require('body-parser')

module.exports = () => {
   const app = express()

   app.use(bodyParser.urlencoded({extended: true}))
   app.use(bodyParser.json())

   consign()
      .include('controllers')
      .into(app)
   
   return app
}

/* module.exports = () => {
   const app = express() 
   app.use(express.urlencoded({extended: true}))
   app.use(express.json())
   consign()
       .include('controllers')
       .into(app)
   return app
} */

//curl -X POST http://localhost:3000/atendimentos -H 'Content-Type: application/json' -d '{"nome":"frozza"}'