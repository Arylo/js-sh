import test from 'ava'
import { $ } from './command'

test('export env value', (t) => {
  t.true($.verbose)
})

test('run git version', (t) => {
  const { stdout } = $('git -v')
  t.true(stdout.includes('git version '))
})
