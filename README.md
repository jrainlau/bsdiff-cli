# bsdiff-cli
Use bsdiff in command line Interface.

### Install

```bash
# yarn
yarn global add bsdiff-cli

# npm
npm i bsdiff-cli -g
```

### Usage
While using `bsdiff-cli`, all the files must be in the same folder, and the `bsdiff` command should be used inside this folder, too.

`<oldFile>`, `<newFile>` and `<patchFile>` should be the file name without any path string, nor errors would occurred.

```bash
bsdiff --help
Usage: bsdiff <command>

Options:
  -V, --version                            output the version number
  -h, --help                               display help for command

Commands:
  diff|d <oldFile> <newFile> <patchFile?>  Do diff and get patch file
  patch|p <oldFile> <newFile> <patchFile>  Do patch and get new file
  help [command]                           display help for command
```

### Test
```bash
yarn test
```

### License
MIT
