import { camelCase } from './deps.ts'

/**
 * Return the text in camelCase + how many 🐪
 *
 * @example "this is an example" -> "thisIsAnExample 🐪🐪🐪"
 * @param text
 * @returns {string}
 */
export function camelize(text: string) {
  const camelCaseText = camelCase(text)
  const matches = camelCaseText.match(/[A-Z]/g) || []
  const camels = Array.from({ length: matches.length })
    .map(() => '🐪')
    .join('')

  return `${camelCaseText} ${camels}`
}