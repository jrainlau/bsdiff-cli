const bsdiff = require('bsdiff-node')
const fs = require('fs')
const path = require('path')
const cliProgress = require('cli-progress')

module.exports = (file1, file2, patchFile) => {
  const pwd = process.cwd()
  const filePath1 = path.join(pwd, file1)
  const filePath2 = path.join(pwd, file2)
  const patchFileName = patchFile || `${file1.replace(/\.[^/.]+$/, '')}-${file2.replace(/\.[^/.]+$/, '')}.patch`
  const patchFilePath = path.join(pwd, patchFileName)
  
  if (!fs.existsSync(filePath1)) {
    console.error(`Error: Cannot found ${file1} in ${pwd}.`)
    return
  }
  if (!fs.existsSync(filePath2)) {
    console.error(`Error: Cannot found ${file2} in ${pwd}.`)
    return
  }
  if (!patchFilePath.endsWith('.patch')) {
    console.error(`Error: Patch file name must ends width ".patch".`)
    return
  }

  console.log('')

  const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
  progressBar.start(100, 0)

  return bsdiff.diff(filePath1, filePath2, patchFilePath, (res, err) => {
    progressBar.update(res);
    if (res >= 100) {
      progressBar.stop()
      console.log(`\n🎉 Do diff process done! \n🤗 Patch file locates in ${patchFilePath}.\n`)
    }
    if (err) {
      console.error(err)
      process.exit(1)
    }
  })
}
