const bsdiff = require('bsdiff-node')
const fs = require('fs')
const path = require('path')
const cliProgress = require('cli-progress')

module.exports = (file1, file2) => {
  const pwd = process.cwd()
  const filePath1 = path.join(pwd, file1)
  const filePath2 = path.join(pwd, file2)
  const patchFilePath = path.join(pwd, `${file1}-${file2}.patch`)
  
  if (!fs.existsSync(filePath1)) {
    console.error(`Error: Cannot found ${file1} in ${pwd}.`)
    return
  }
  if (!fs.existsSync(filePath2)) {
    console.error(`Error: Cannot found ${file2} in ${pwd}.`)
    return
  }

  console.log('')

  const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
  progressBar.start(100, 0)

  return new Promise((resolve) => {
    bsdiff.diff(filePath1, filePath2, patchFilePath, (res, err) => {
      progressBar.update(res);
      if (res === 100) {
        progressBar.stop()
        console.log(`\n🎉 Do diff process done! \n🤗 Patch file locates in ${patchFilePath}.\n`)
        resolve()
      }
    })
  })
}
