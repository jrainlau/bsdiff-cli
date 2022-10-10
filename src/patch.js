const bsdiff = require('bsdiff-node')
const fs = require('fs')
const path = require('path')
const cliProgress = require('cli-progress')

module.exports = (oldFile, newFile, patchFile) => {
  const pwd = process.cwd()
  const oldFilePath = path.join(pwd, oldFile)
  const newFilePath = path.join(pwd, newFile)
  const patchFilePath = path.join(pwd, patchFile)
  
  if (!fs.existsSync(oldFilePath)) {
    console.error(`Error: Cannot found ${oldFilePath} in ${pwd}.`)
    return
  }
  if (!newFile) {
    console.error(`The param <newFile> cannot be empty!`)
    return
  }
  if (!fs.existsSync(patchFilePath)) {
    console.error(`Error: Cannot found ${patchFilePath} in ${pwd}.`)
    return
  }

  console.log('')

  const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
  progressBar.start(100, 0)

  return new Promise((resolve) => {
    bsdiff.patch(oldFilePath, newFilePath, patchFilePath, (res, err) => {
      progressBar.update(res);
      if (res === 100) {
        progressBar.stop()
        console.log(`\n🎉 Do patch process done! \n🤗 New file locates in ${newFilePath}.\n`)
        resolve()
      }
    })
  })
}
