const { generatePatchPackage } = require('fruitade')
const fs = require('fs')
const path = require('path')

module.exports = async (oldFolder, newFolder, folderOfPatches) => {
  folderOfPatches = folderOfPatches ? folderOfPatches :  `${oldFolder}-${newFolder}`
  const pwd = process.cwd()
  const actualOldFolderPath = path.join(pwd, oldFolder)
  const actualNewFolderPath = path.join(pwd, newFolder)
  const actualFolderOfPatches = path.join(pwd, folderOfPatches)

  if (!fs.existsSync(actualOldFolderPath)) {
    console.error(`Error: Cannot found ${oldFolder} in ${pwd}.`)
    return
  }

  if (!fs.existsSync(actualNewFolderPath)) {
    console.error(`Error: Cannot found ${newFolder} in ${pwd}.`)
    return
  }

  await generatePatchPackage({
    folderOfA: actualOldFolderPath,
    folderOfB: actualNewFolderPath,
    folderOfPatches: actualFolderOfPatches,
  })

  return true
}

