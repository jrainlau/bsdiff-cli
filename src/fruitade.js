const { generatePatchPackage, generateNewVersionPackage } = require('fruitade')
const fs = require('fs')
const path = require('path')

const getBsdiff = () => require('bsdiff-node')

exports.fruitadeDiff = async (oldFolder, newFolder, patchesFolder) => {
  patchesFolder = patchesFolder ? patchesFolder :  `${oldFolder}-${newFolder}`
  const pwd = process.cwd()
  const actualOldFolderPath = path.join(pwd, oldFolder)
  const actualNewFolderPath = path.join(pwd, newFolder)
  const actualPatchesFolderPath = path.join(pwd, patchesFolder)

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
    folderOfPatches: actualPatchesFolderPath,
    getBsdiff,
  })

  return true
}

exports.fruitadePatch = async (oldFolder, patchesFolder, newFolder) => {
  const pwd = process.cwd()
  const actualOldFolderPath = path.join(pwd, oldFolder)
  const actualNewFolderPath = path.join(pwd, newFolder)
  const actualPatchesFolderPath = path.join(pwd, patchesFolder)

  if (!fs.existsSync(actualOldFolderPath)) {
    console.error(`Error: Cannot found ${oldFolder} in ${pwd}.`)
    return
  }

  if (!fs.existsSync(actualPatchesFolderPath)) {
    console.error(`Error: Cannot found ${patchesFolder} in ${pwd}.`)
    return
  }

  await generateNewVersionPackage({
    folderOfA: actualOldFolderPath,
    folderOfPatches: actualPatchesFolderPath,
    folderOfNewVersion: actualNewFolderPath,
    getBsdiff,
  })

  return true
}

