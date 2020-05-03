export function randomString(length) {
  let result = '',
      characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
      // characters = 'ab',
      charactersLength = characters.length,
      resultArr = []

  for (let i = 0; i < length; i++) 
    // resultArr.push(characters.charAt(Math.floor(Math.random() * charactersLength)))
    resultArr.push(chars[Math.floor(Math.random() * charactersLength)])

  result = resultArr.join('')

  return result
}

// For quick string searching
export const 
  charDict = {},
  chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(''),
  total = 10**7,
  stringLength = 100

chars.forEach((char, index) => charDict[char] = index)

export function reduceStringToNumber(string) {
  const len = string.length,
        size = chars.length

  let result = 0

  for(let i = len - 1; i >= 0; i--) {
    const char = string[i]

    result += size**(len - i) * charDict[char]
  }

  return result
}