const moment = require('moment')
const conexao = require('../infraestrutura/conexao')

class Atendimento {
   adiciona(atendimento, res) {
      const dataCriacao = moment().format('yyyy-MM-DD HH:mm:ss')
      const data = moment(atendimento.data, 'DD/MM/yyyy').format('yyyy-MM-DD HH:mm:ss')
      
      //Validacoes
      const dataValida = moment(data).isSameOrAfter(dataCriacao)
      const clienteValido = atendimento.cliente.length >= 5

      const validacoes = [
         {
            nome: 'data',
            valido: dataValida,
            mensagem: 'Data deve ser maior ou igual a data atual.'
         },
         {
            nome: 'cliente',
            valido: clienteValido,
            mensagem: 'Cliente deve ter pelo menos cinco caracteres.'
         }
      ]

      const erros = validacoes.filter(campo => !campo.valido)
      const existemErros = erros.length

      if(existemErros) {
         res.status(400).json(erros)
      } else {
         const atendimentoDatado = {...atendimento, dataCriacao, data}
      
         const sql = 'INSERT INTO Atendimentos SET ?'

         conexao.query(sql, atendimentoDatado, (erro) => {
            if(erro) {
               res.status(400).json(erro)
            } else {
               res.status(201).json(atendimento)
            }
         })
      }      
   }

   listar(res) {
      const sql = `SELECT * FROM Atendimentos`

      conexao.query(sql, (erro, resultados) => {
         if(erro) {
            res.status(400).json(erro)
         } else {
            res.status(200).json(resultados)
         }
      })
   }

   buscaId(id, res) {
      const sql = `SELECT * FROM Atendimentos WHERE id=${id}`

      conexao.query(sql, (erro, resultado) => {
         const atendimentoId = resultado[0]
         if(erro) {
            res.status(400).json(erro)
         } else {
            res.status(200).json(atendimentoId)
         }
      })
   }

   altera(id, valores, res) {
      if(valores.data) {
         valores.data = moment(valores.data, 'DD/MM/yyyy').format('yyyy-MM-DD HH:mm:ss')
      }
      const sql = 'UPDATE Atendimentos SET ? WHERE id=?'

      conexao.query(sql, [valores, id], (erro) => {
         if (erro) {
            res.status(400).json(erro)
         } else {
            res.status(200).json({...valores, id})
         }
      })
   }

   deletar(id, res) {
      const sql = `DELETE FROM Atendimentos WHERE id=?`
      
      conexao.query(sql, id, (erro) => {
         if(erro) {
            res.status(400).json(erro)
         } else {
            res.status(200).json({id})
         }
      })
   }
}

module.exports = new Atendimento