const fs = require('fs')
const path = require('path')
const jsSh = require('../apps/js-sh')

jsSh.cd(path.resolve(__dirname, '..'))
jsSh.rm('.nyc_output')
jsSh.rm('coverage')


jsSh.mkdir('.nyc_output')
const targetPath = path.resolve(jsSh.pwd(), '.nyc_output')
const workspaces = ['apps', 'packages']

workspaces.forEach((w) => {
  const workspacePath = path.resolve(jsSh.pwd(), w)
  fs.readdirSync(workspacePath).forEach((item) => {
    const projectPath = path.resolve(workspacePath, item)
    const projectName = require(path.resolve(projectPath, 'package.json'))
      .name
      .replace(/[@\/]/g, '__')
    const filePath = path.resolve(projectPath, 'coverage/coverage-final.json')
    fs.existsSync(filePath) && fs.copyFileSync(filePath, path.resolve(targetPath, `${projectName}.json`))
  })
})
