const res = require('express/lib/response')
const Atendimento = require('../models/mAtendimentos')

module.exports = app => {
   app.get('/atendimentos', (req, res) => {
      Atendimento.listar(res)
   })

   app.get('/atendimentos/:id', (req, res) => {
      const id = parseInt(req.params.id)
      console.log(req.params)

      Atendimento.buscaId(id, res)      
   })
   
   app.post('/atendimentos', (req, res) => {
      const atendimento = req.body

      Atendimento.adiciona(atendimento, res)      
   })

   app.patch('/atendimentos/:id', (req, res) => {
      const id = parseInt(req.params.id)
      const valores = req.body

      Atendimento.altera(id, valores, res)
   })

   app.delete('/atendimentos/:id', (req, res) => {
      const id = parseInt(req.params.id)

      Atendimento.deletar(id, res)
   })
}