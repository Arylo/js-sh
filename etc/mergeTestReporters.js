const fs = require('fs')
const path = require('path')
const { cd, rm, mkdir, pwd, cp, $, echo } = require('../apps/js-sh')

const CACHE_FOLDER = '.nyc_output'
const WORKSPACES = ['apps', 'packages']

cd(path.resolve(__dirname, '..'))
rm(CACHE_FOLDER)
rm('coverage')
mkdir(CACHE_FOLDER)

WORKSPACES.forEach((w) => {
  const workspacePath = path.resolve(pwd(), w)
  fs.readdirSync(workspacePath).forEach((item) => {
    const projectPath = path.resolve(workspacePath, item)
    const projectName = require(path.resolve(projectPath, 'package.json'))
      .name
      .replace(/[@\/]/g, '__')
    cp(`${w}/${item}/coverage/coverage-final.json`, `${CACHE_FOLDER}/${projectName}.json`)
  })
})

const { stdout } = $('npx nyc report')
console.log(stdout)
