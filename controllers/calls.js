const Call = require('../Models/calls')

module.exports = app => {
  app.post('/calls', async(req, res) => {
    try {
      const call = req.body
      const results = await Call.createCall(call)
      res.status(200).json(results)      
    } catch (error) {
      res.status(500).json(error)
    }
  })
  
  app.get('/calls', async(req, res) => {
    try {
      const results = await Call.getAllCalls()
      res.status(200).json(results)   
    } catch (error) {
      res.status(500).json(error)
    }
  })

  app.get('/calls/:id', async(req, res) => {
    try {
      const id = parseInt(req.params.id)
      const results = await Call.getCallById(id)
      res.status(200).json(results)      
    } catch (error) {
      res.status(500).json(error)
    }
  })

  app.patch('/calls/:id', async(req, res) => {
    try {
      const id = parseInt(req.params.id)
      const values = req.body
      const results = await Call.updateCall(id, values)
      res.status(200).json(results)      
    } catch (error) {
      res.status(500).json(error)
    }
  })
  
  app.delete('/calls/:id', async(req,res) => {
    try {
      const id = parseInt(req.params.id)
      const results = await Call.deleteCall(id)
      res.status(200).json(results)      
    } catch (error) {
      res.status(500).json(error)
    }
  })

}