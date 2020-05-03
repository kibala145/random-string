/* eslint-disable */
import {randomString, chars, total, stringLength} from '../utils/index'
import idb from './../api/idb'

self.onmessage = async function(e) {
  if(e.data.type === 'getObjectStore') {
    await getObjectStore()
  }
  if(e.data.type === 'makeRandomStrings') {
    await generateData()
  }
  if(e.data.type === 'getRandomStringsCount') {
    await search({startsWithValue: e.data.payload.value, searchByValue: e.data.payload.searchByValue})
  }
  if(e.data.type === 'clearStorage') {
    await clear()
    self.postMessage({type:'SET_LAST_SEARCH_DURATION', payload: null})
    self.postMessage({type: 'SET_SEARCH_COUNT', payload: null})
    self.postMessage({type: 'SET_SEARCH_STRING', payload: null})
    await getObjectStore()
  }
}

/* actions */

async function getObjectStore() {
  self.postMessage({type: 'SET_IS_DATABASE_LOADING'})

  const objectStoreCount = await idb.getObjectStoreCount()
  
  self.postMessage({type: 'SET_IS_DATABASE_LOADING', payload: false})
  if(!objectStoreCount) self.postMessage({type: 'SET_IS_DATABASE_EMPTY', payload: true})
}

async function generateData() {
  // Perform the calculation
  self.postMessage({ type: 'SET_IS_GENERATING' })
  self.postMessage({ type: 'SET_GENERATING_COUNT', payload: 0 })

  let index = 0,
      str,
      curStrArr = []
  
  console.log('generating strings')
  
  // execution time start
  // var t0 = performance.now()
  while(index <= total - 1) {
    str = randomString(stringLength)

    curStrArr.push(str)
    
    /* 
      group_max_size=133169152 bytes 
      split 10**7 into n chunks by 10**7/n
      this made for quick upload, otherwise we could upload each string individually
    */
    const n = 100

    if((index + 1) % (total/n) === 0) {
      self.postMessage({type: 'SET_GENERATING_COUNT', payload: index + 1})
      console.log(index + 1)
      console.log('saving to db')
      await idb.saveStringsChunk(curStrArr).catch(e => {
        self.postMessage('SET_ERROR', true)
        throw('Error while saving chunk')
      })
      curStrArr = []
    }
    index++
  }
  /* execution time end (~150815ms vs ~57380ms) */
  // var t1 = performance.now()
  // console.log((t1 - t0) + " milliseconds.")
        
  console.log('done generating strings')
  self.postMessage({ type: 'SET_IS_GENERATING', payload: false })
  self.postMessage({type: 'SET_IS_DATABASE_EMPTY', payload: false})
}

async function search({startsWithValue, searchByValue = true}) {
  let stringsCount

  self.postMessage({type: 'SET_IS_SEARCHING'})
  // Start time
  const t1 = performance.now()
  
  if(searchByValue) {
    const firstChar = chars[0],
          lastChar = chars[chars.length - 1],
          valueStr1 = startsWithValue.padEnd(100, firstChar),
          valueStr2 = startsWithValue.padEnd(100, lastChar),
          value1 = reduceStringToNumber(valueStr1),
          value2 = reduceStringToNumber(valueStr2)

    stringsCount = await idb.getStringsCount({value1, value2})
  } else stringsCount = await idb.getStringsCount({startsWithValue}).catch(e => self.postMessage('SET_ERROR', true))
  // Finish time
  const t2 = performance.now(),
        duration = t2 - t1

  self.postMessage({type: 'SET_LAST_SEARCH_DURATION', payload: duration})

  self.postMessage({type: 'SET_SEARCH_COUNT', payload: stringsCount})
  self.postMessage({type: 'SET_IS_SEARCHING', payload: false})
}

async function clear() {
  self.postMessage({type: 'SET_IS_DATABASE_CLEARING', payload: true})
  await idb.clearObjectStore()
  self.postMessage({type: 'SET_IS_DATABASE_CLEARING', payload: false})
}