#!/usr/bin/env node
const { resolve } = require('path')
const { program } = require('commander')
const { version } = require(resolve(__dirname, '../package.json'))
const path = require('path')

const diff = require('../src/diff.js')
const patch = require('../src/patch.js')

process.env.NODE_PATH = resolve(__dirname, '../node_modules/')

program
  .version(version)

program
  .usage('<command>')

program
  .command('diff <oldFile> <newFile> [patchFile]')
  .description('Do diff and get patch file')
  .alias('d')
  .action(() => {
    const [command, file1, file2, patchFile] = program.args
    diff(file1, file2, patchFile)
  })

program
  .command('patch <oldFile> <newFile> <patchFile>')
  .description('Do patch and get new file')
  .alias('p')
  .action(() => {
    const [command, oldFile, newFile, patchFile] = program.args
    patch(oldFile, newFile, patchFile)
  })

program.parse(process.argv)
