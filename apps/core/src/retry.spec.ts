import test from 'ava'
import Sinon from 'sinon'
import { faker } from '@faker-js/faker'
import { retry } from './retry'

test('should retry 5 time the function if the function always fail', async (t) => {
  const stub = Sinon.stub()
    .rejects()
  try {
    await retry(5, () => stub())
  } catch (error) {
    t.is(5, stub.callCount)
  }
})

test('should no retry the function if the function run success first call', async (t) => {
  const content = faker.word.sample()
  const stub = Sinon.stub()
    .resolves(content)
  const result = await retry(5, () => stub())
  t.is(1, stub.callCount)
  t.is(content, result)
})
