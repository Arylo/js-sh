import test from 'ava'
import { $ } from './command'

test('should export env value', (t) => {
  t.true($.verbose)
})

test('should can modify env value', (t) => {
  t.true($.verbose)
  $.verbose = false
  t.false($.verbose)
})

test('should return stdout in the success command', (t) => {
  const { stdout, stderr } = $('echo 1')
  t.true(stdout.includes('1'))
  t.deepEqual(stderr, '')
})

test('should return stderr in the fail command', (t) => {
  const { stdout, stderr } = $('git st')
  t.deepEqual(stdout, '')
  t.true(!!stderr)
})
