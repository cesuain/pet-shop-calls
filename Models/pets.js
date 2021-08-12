const connection = require('../infrastructure/database/connection')
const uploadFile = require('../infrastructure/files/uploadFiles')

class Pet {
  add(pet, res){
    const sql = 'INSERT INTO Pets SET ?'

    uploadFile(pet.image, pet.name, (error, newWay) => {
      if(error) {
        res.status(400).json({ error })
      } else {
        const newPet = { name: pet.name, image: newWay }
        connection.query(sql, newPet, error => {
          if(error){
            res.status(400).json(error)
          } else {
            res.status(200).json(newPet)
          }
        })
      }
    })
  }
}

module.exports = new Pet()