import test from 'ava'
import { faker } from '@faker-js/faker'
import { startCommand } from './CommandOutput'

test('should return result', (t) => {
  const target = faker.word.sample()
  const command = startCommand()
  const result = command.appendResult(target)
  t.deepEqual(result, target)
})
