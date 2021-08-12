const query = require('../infrastructure/database/queries')

class Call {
  add(call){
    const sql = 'INSERT INTO Calls SET ?'
    return query(sql, call)
  }

  getAll(){
    const sql = 'SELECT * FROM Calls'
    return query(sql)
  }

  getById(id){
    const sql = `SELECT * FROM Calls WHERE ID = ${id}`
    return query(sql, id)
  }

  update(id, values){
    const sql = `UPDATE Calls SET ? WHERE ID = ${id}`
    return query(sql, values)
  }

  delete(id){
    const sql = `DELETE FROM Calls WHERE ID = ${id}`
    return query(sql)
  }
  
}

module.exports = new Call()