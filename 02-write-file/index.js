const fs = require('fs')
const path = require('path')
const readline = require('readline');

const writeStream = fs.createWriteStream(path.join(__dirname, 'text.txt'))

const rl = readline.createInterface({ input : process.stdin, output :process.stdout });

process.stdout.write('Please enter the text: \n')

rl.on('line', (input) => {
  if (input=='exit') {
    rl.close()
    return
  }
  writeStream.write(input)
})
.on('close', ()=>console.log('text entry completed'))