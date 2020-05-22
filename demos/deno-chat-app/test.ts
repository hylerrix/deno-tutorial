import { assertStrictEq } from 'https://deno.land/std/testing/asserts.ts'
import { camelize } from './camelize.ts'

Deno.test('camelize works', async () => {
  assertStrictEq(camelize('this is an example'), 'thisIsAnExample 🐪🐪🐪')
})