const fs = require('fs')
const path = require('path')

async function buildPage() {
  await fs.promises.mkdir(path.join(__dirname, 'project-dist'), { recursive: true })
  let resultHTML = await fs.promises.readFile(path.join(__dirname, 'template.html'), 'utf-8')
  let components = await fs.promises.readdir(path.join(__dirname, 'components'))
  for (const component of components) {
    let temp = await fs.promises.readFile(path.join(__dirname, 'components', component), 'utf-8')
    resultHTML = resultHTML.replace(`{{${component.replace('.html', '')}}}`, temp)
  }
  await fs.promises.writeFile(path.join(__dirname, 'project-dist', 'index.html'), resultHTML)
  
  let styles = await fs.promises.readdir(path.join(__dirname, 'styles'))
  let resultStyle = ''
  for (const style of styles) {
    resultStyle+= await fs.promises.readFile(path.join(__dirname, 'styles',style))
  }
  await fs.promises.writeFile(path.join(__dirname, 'project-dist', 'style.css'), resultStyle)

  await fs.promises.rm(path.join(__dirname, 'project-dist', 'assets'), {recursive: true, force: true})

  await fs.promises.mkdir(path.join(__dirname, 'project-dist', 'assets'), {recursive: true})

  copyDir(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist', 'assets'))
}

async function copyDir(pathFrom, pathTo){
  let assets = await fs.promises.readdir(pathFrom, {withFileTypes: true})
  for (const asset of assets) {
    if(asset.isDirectory()){
      await fs.promises.mkdir(path.join(pathTo, asset.name), {recursive: true})
      copyDir(path.join(pathFrom, asset.name),path.join(pathTo, asset.name))
    }
    else {
      await fs.promises.copyFile(path.join(pathFrom, asset.name), path.join(pathTo, asset.name))
    }
  }
}

buildPage()

