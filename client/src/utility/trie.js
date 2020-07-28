import { NO_LETTER, WORD_EXISTS, WORD_DOES_NOT_EXIST } from '../actions/types'

export const createTrie = users => {
  const root = {
    childNodes: {},
    wordCount: 0
  }

  let currentNode

  for (let i = 0; i < users.length; i += 1) {
    currentNode = root

    for (let j = 0; j < users[i].name.length; j += 1) {
      const letter = users[i].name[j].toLowerCase()

      if (currentNode.childNodes[letter]) {
        currentNode = currentNode.childNodes[letter] 
      } else {
        currentNode.childNodes[letter] = {
          letter: letter,
          parentNode: currentNode,
          childNodes: {},
          isAWord: false
        }

        currentNode = currentNode.childNodes[letter]
      }

      if (j === users[i].name.length - 1) {
        currentNode.isAWord = true 
        root.wordCount += 1
      }
    }
  }

  return root
}

export const removeWordFromTrie = (trie, word) => {
  let currentNode = trie
  let wordExistsInTrie = false

  for (let i = 0; i < word.length; i += 1) {
    if (currentNode.childNodes[word[i]]) {
      currentNode = currentNode.childNodes[word[i]]
    }

    if (i === word.length - 1 && currentNode.isAWord) {
      wordExistsInTrie = true
    }
  }

  if (wordExistsInTrie) {
    if (Object.keys(currentNode.childNodes).length === 0) {  
      while (true) {
        if (!currentNode.parentNode.parentNode
            || Object.keys(currentNode.parentNode.childNodes).length > 1
            || currentNode.parentNode.isAWord) {
          delete currentNode.parentNode.childNodes[currentNode.letter]
          return
        }
  
        currentNode = currentNode.parentNode
      } 
    }

    currentNode.isAWord = false
  }
}

const findBreakNode = (trie, word) => {
  let breakNode

  for (let i = 0; i < word.length; i += 1) {
    if (i === 0) {
      if (trie.childNodes[word[i]]) {
        breakNode = trie.childNodes[word[i]]
      } else {
        return undefined
      }
    } else {
      if (breakNode.childNodes[word[i]]) {
        breakNode = breakNode.childNodes[word[i]]
      } else {
        return undefined
      }
    }
  }

  return breakNode
}

export const getFirstFiveWords = (trie, word) => {
  const alphabet = ['-', ' ', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  const breakNode = findBreakNode(trie, word.toLowerCase())
  let wordsArray = []
  let currentNode = breakNode
  let queryWord = word.toLowerCase()
  
  if (breakNode === undefined) {
    return wordsArray
  }

  while (true) {
    if (currentNode.isAWord) {
      wordsArray.push(queryWord)
      
      if (wordsArray.length === 5) {
        return wordsArray
      }

      if (Object.keys(currentNode.childNodes).length === 0) {
        let letterFounded = false

        for (let i = queryWord.length - 2; i >= word.length - 1; i -= 1) {
          currentNode = currentNode.parentNode

          if (Object.keys(currentNode.childNodes).length > 1) {
            for (let j = alphabet.indexOf(queryWord[i + 1]) + 1; j < alphabet.length; j += 1) {
              if (currentNode.childNodes[alphabet[j]]) {
                currentNode = currentNode.childNodes[alphabet[j]]
                queryWord = queryWord.substring(0, i + 1) + alphabet[j]
                letterFounded = true
                break
              }
            }
          }

          if (letterFounded) break
        }

        if (!letterFounded) {
          return wordsArray
        }
      }
    } 
    
    if (Object.keys(currentNode.childNodes).length > 0) {
      for (let i = 0; i < alphabet.length; i += 1) {        
        if (currentNode.childNodes[alphabet[i]]) {
          queryWord += alphabet[i]
          currentNode = currentNode.childNodes[alphabet[i]]
          break
        }
      }
    }
  }
}

export const createTheAnimationPath = (trie, word) => {
  const animationPath = []
  let currentNode = trie

  for (let i = 0; i < word.length; i++) {
    if (currentNode.childNodes[word[i]]) {
      if (i === word.length - 1) {
        const wordExists = currentNode.childNodes[word[i]].isAWord ?
          WORD_EXISTS : WORD_DOES_NOT_EXIST

        animationPath.push([word[i], Object.keys(currentNode.childNodes), word[i - 1] + word[i], wordExists])
      } else {
        let bridge = []

        if (i === 0) {
          bridge.push('0')
          bridge.push(word[i])
        } else {
          bridge.push(word[i - 1])
          bridge.push(word[i])
        }
        
        if (i !== 0 && word[i - 1] === ' ') bridge[0] = '_'
        if (word[i] === ' ') bridge[1] = '_'

        animationPath.push([word[i], Object.keys(currentNode.childNodes), bridge.join('')])
      }
    } else {
      animationPath.push(NO_LETTER)
      break
    }

    currentNode = currentNode.childNodes[word[i]]
  }
  
  return animationPath 
}