const fs = require('fs')
const path = require('path')

const output = fs.createWriteStream(path.join(__dirname,'project-dist', 'bundle.css'),'utf-8')
const stylesPath = path.join(__dirname, 'styles')

fs.readdir(path.join(__dirname, 'styles'),(err, files)=>{
  if (err) console.log(err);
  else{
    files.forEach( (file)=>{
      const filePath = path.join(stylesPath, file)
      const ext = path.extname(filePath)
      if(ext == '.css') {
        const input = fs.createReadStream(filePath)
        input.on('data', data=>{
          output.write(data + '\n')
        })
      }
    })
  }
})