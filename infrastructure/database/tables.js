class Tables {
  init(connection) {
    this.connection = connection
    this.loadCallsTable()
    this.loadPetsTable()
  }

  loadCallsTable() {
    const sql = `CREATE TABLE IF NOT EXISTS Calls (
      id int NOT NULL AUTO_INCREMENT,
      client VARCHAR(11) NOT NULL,
      pet VARCHAR(20),
      service VARCHAR(20) NOT NULL,
      date datetime NOT NULL,
      create_date datetime NOT NULL,
      status VARCHAR(20) NOT NULL,
      note text, PRIMARY KEY(id))`
    this.connection.query(sql, erro => {
      if(erro) {
        console.log(erro);
      } else {
        console.log('The Calls table has been loaded successfully!');
      }
    })
  }

  loadPetsTable(){
    const sql = `CREATE TABLE IF NOT EXISTS Pets(
      id INT NOT NULL AUTO_INCREMENT,
      name VARCHAR(50),
      image VARCHAR(200),
      PRIMARY KEY (id)
    )`
    this.connection.query(sql, error => {
      if(error){
        console.log(error);
      } else {
        console.log('The Pets table has been loaded successfully!');
      }
    })
  }
}

module.exports = new Tables