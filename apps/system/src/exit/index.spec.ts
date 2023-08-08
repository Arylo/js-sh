import test from 'ava'
import sinon from 'sinon'
import * as utils from '@js-sh/utils'
import { exit } from './index'

test.beforeEach(() => {
  sinon.restore()
})

test.serial('should exit process with code 0', (t) => {
  const source: [number] = [0]
  const mockExit = sinon.stub(process, 'exit')
    .callsFake(((code: number) => {
      t.is(source[0], code)
    }) as any)
  exit(...source)
  t.true(mockExit.called)
})

test.serial('should exit process with code 1', (t) => {
  const source: [number] = [1]
  const mockExit = sinon.stub(process, 'exit')
    .callsFake(((code: number) => {
      t.is(source[0], code)
    }) as any)
  exit(...source)
  t.true(mockExit.called)
})

test.serial('should exit process with code 1 and exit message', (t) => {
  const source: [number, string] = [1, 'Bye~']
  const mockExit = sinon.stub(process, 'exit')
    .callsFake(((code: number) => {
      t.is(source[0], code)
    }) as any)
  const mockNotification = sinon.stub(console, 'info')
  exit(...source)
  t.true(mockExit.called)
  t.true(mockNotification.called)
})
