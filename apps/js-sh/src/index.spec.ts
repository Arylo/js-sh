import test from 'ava'
import * as curModule from './index'
import * as coreModule from '@js-sh/core'
import * as sysModule from '@js-sh/system'

test('should same count from each import modules', (t) => {
  const curLength = Object.keys(curModule).length
  const coreLength = Object.keys(coreModule).length
  const sysLength = Object.keys(sysModule).length
  t.is(curLength, coreLength + sysLength)
})
