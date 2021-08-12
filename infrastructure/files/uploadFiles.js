const fs = require('fs')
const path = require('path')

module.exports = (way, fileName, callbackCreatedImage) => {
  const allowedTypes = ['jpg', 'jpeg', 'png']
  const fileType = path.extname(way)
  const isTypeAllowed = allowedTypes.indexOf(fileType.substring(1)) !== -1

  if(isTypeAllowed){
    const newWay = `./assets/images/${fileName}${fileType}`

    fs.createReadStream(way)
      .pipe(fs.createWriteStream(newWay))
      .on('finish', () => callbackCreatedImage(false, newWay))
  } else {
      const error = 'The image type is not valid!'
      
      callbackCreatedImage(error)
  }
}

