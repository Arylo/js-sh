const path = require('path')
const { cd, rm, mkdir, pwd, cp, $, ls, within } = require('../apps/js-sh')

const CACHE_FOLDER = '.nyc_output'
const WORKSPACES = ['apps', 'packages']
const ROOT_PATH = path.resolve(__dirname, '..')

cd(ROOT_PATH)
rm(CACHE_FOLDER)
rm('coverage')
mkdir(CACHE_FOLDER)

WORKSPACES.forEach((w) => {
  ls(`${pwd()}/${w}/*/package.json`)
    .forEach((p) => {
      within(() => {
        cd(path.dirname(p))
        const projectName = require(ls('package.json')[0])
          .name
          .replace(/[@\/]/g, '__')
        cp.force(`coverage/coverage-final.json`, `${ROOT_PATH}/${CACHE_FOLDER}/${projectName}.json`)
      })
    })
})

const { stdout } = $('npx nyc report')
console.log(stdout)
