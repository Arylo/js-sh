import { ls, cp, mkdir, rm } from '@js-sh/js-sh'

const CACHE_FOLDER = '.nyc_output'

rm(CACHE_FOLDER)
mkdir(CACHE_FOLDER)

ls('./apps/*/coverage/coverage-final.json')
  .forEach((p) => {
    cp(p, `${CACHE_FOLDER}/`)
  })
