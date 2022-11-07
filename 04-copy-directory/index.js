const fs = require('fs')
const path = require('path')

async function copyDir(pathFrom, pathTo){
  await fs.promises.rm(pathTo, {recursive: true, force: true})
  await fs.promises.mkdir(pathTo)
  let files = await fs.promises.readdir(pathFrom, {withFileTypes: true})
  for (const file of files) {
    if(file.isDirectory()){
      await fs.promises.mkdir(path.join(pathTo, file.name), {recursive: true})
      copyDir(path.join(pathFrom, file.name),path.join(pathTo, file.name))
    }
    else {
      await fs.promises.copyFile(path.join(pathFrom, file.name), path.join(pathTo, file.name))
    }
  }
}

copyDir(path.join(__dirname, 'files') , path.join(__dirname, 'files-copy'))