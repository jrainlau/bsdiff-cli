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
```bash
bsdiff --help
Usage: bsdiff <command>

Options:
  -V, --version                            output the version number
  -h, --help                               display help for command

Commands:
  diff|d <oldFile> <newFile>               Do diff and get patch file
  patch|p <oldFile> <newFile> <patchFile>  Do patch and get new file
  help [command]                           display help for command
```

### Test
```bash
yarn test
```

### License
MIT
