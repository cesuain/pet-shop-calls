const axios = require('axios')
const moment = require('moment')
const repository = require('../repositories/calls')
const modernAsync = require('modern-async')

class Call {
  constructor() {
    this.isDateValid = ({ date, create_date }) => moment(date).isSameOrAfter(create_date)
    this.isClientValid = size => size >= 5


    this.validate = parameters => 
      this.validations.filter(field => {
        const { name } = field
        const parameter = parameters[name]

        return !field.valid(parameter)
      })
    
    this.validations = [
      {
        name: 'date',
        valid: this.isDateValid,
        message: 'Date must be greater or equal the actual date'
      },
      {
        name: 'client',
        valid: this.isClientValid,
        message: 'The client name must be at least five caracteres'
      }
    ]
  }

  async createCall(call) {
    const create_date = moment().format('YYYY-MM-DD HH:MM:SS')
    const date = moment(call.date, 'MM/DD/YYYY').format('YYYY-MM-DD HH:MM:SS')

    const parameters = {
      client: call.client.length,
      date: { date, create_date }
    }

    const errors = this.validate(parameters)
    const thereIsErrors = errors.length

    if(thereIsErrors) {
      return new Promise((resolve, reject) => reject(errors))
    } else {
      const call_date = { ...call, create_date, date }

      try {
        const results = await repository.add(call_date)
        const id = results.insertId
        const call = call_date
        const cpf = call.client
        const { data } = await axios.get(`http://localhost:8082/${cpf}`)
        call.client = data

        return { ...call, id }
      } catch (error) {
        console.log(error)
      }
    }
  }

  async getAllCalls() {
    try {
			const results = await repository.getAll()
			const callWithCPF = await modernAsync.map(results, async(call) => {
        const cpf = call.client
        const { data } = await axios.get(`http://localhost:8082/${cpf}`)
        call.client = data 

        return call
      })
      return callWithCPF
		}
		catch(error){
			console.log(error)
		}   
  }    

  async getCallById(id){
		try {
			const results = await repository.getById(id)
			const call = results[0]
			const cpf = call.client
			const { data } = await axios.get(`http://localhost:8082/${cpf}`)
			call.client = data

			return call
		}
		catch(error){
			console.log(error)
		}   
  }

  async updateCall(id, values){
    if(values.date){
      values.date = moment(values.date, 'MM/DD/YYYY').format('YYYY-MM-DD HH:MM:SS')
    }
		try {
			const results = await repository.update(id, values)
			return results
		}
		catch(error){
			console.log(error)
		}   
  }

  async deleteCall(id){
    try {
			await repository.delete(id)
			return `The call with the id: ${id} was removed!`
		}
		catch(error){
			console.log(error)
		}   
  }

}

module.exports = new Call