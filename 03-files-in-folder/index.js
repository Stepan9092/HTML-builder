const fs = require('fs');
const path = require('path')

fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true },
  (error, dirEntry) => {
    if (error) { console.log(error) }
    else {
      dirEntry.forEach(file => {
        if (file.isFile()) {
          let filePath = path.join(__dirname, 'secret-folder', file.name)
          let extname = path.extname(filePath)
          fs.stat(filePath, (error, stats) => {
            if(error){
              console.log(error);
            }
            else{
              console.log(file.name.replace(extname, ''),'-', extname.slice(1),'-', stats.size / 1000 + 'kb')
            }
          })
        }
      })
    }
  })

