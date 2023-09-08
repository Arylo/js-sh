import { mockPathTest } from '@js-sh/test-utils'
import { cat } from './index'
import { run } from '@js-sh/store'

const test = mockPathTest()

test('should display file content', (t) => {
  run({ cwd: t.context.testPath }, () => {
    cat('a/aa/aaa/aaaa.txt')
    t.true(true)
  })
})
