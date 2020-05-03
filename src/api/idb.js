const DB_NAME = 'stringsdb'
const STORAGE_NAME = 'strings'
const DB_VERSION = 1
let DB

export default {
  async getDb () {
    return new Promise((resolve, reject) => {
      if (DB) {
        return resolve(DB)
      }
      const request = indexedDB.open(DB_NAME, DB_VERSION)
      request.onerror = e => {
        console.log('Error opening db', e)
        // eslint-disable-next-line prefer-promise-reject-errors
        reject('Error')
      }
      request.onsuccess = e => {
        DB = e.target.result
        resolve(DB)
      }
      request.onupgradeneeded = e => {
        let db = e.target.result
        db.createObjectStore(STORAGE_NAME, { autoIncrement: true })
      }
    })
  },
  // Function returns chunk arrays count in database
  async getObjectStoreCount() {
    const objectStore = await this.getObjectStore()

    return new Promise((resolve, reject) => {
      const countRequest = objectStore.count()

      countRequest.onsuccess = e => resolve(e.target.result)
      countRequest.onerror = e => reject(e)
    })
  },
  async getObjectStore() {
    const db = await this.getDb(),
          tx = db.transaction(STORAGE_NAME, 'readwrite'),
          objectStore = tx.objectStore(STORAGE_NAME)

    return objectStore
  },
  async clearObjectStore() {
    const objectStore = await this.getObjectStore()

    return new Promise((resolve, reject) => {
      const req = objectStore.clear()
      
      req.onsuccess = function (e) {
        resolve(e)
        console.log("Object store cleared successfuly");
      }
      req.onerror = function (e) {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject(e)
        console.log("Object store couldn't be cleared");
      }
      req.onblocked = function (e) {
        reject(e)
        console.log("Couldn't clear object store due to the operation being blocked");
      }      
    })
  },
  async getStringsCount({value1 = -Infinity, value2 = Infinity, startsWithValue = null}) {
    let db = await this.getDb()

    return new Promise(resolve => {
      let trans = db.transaction([STORAGE_NAME], 'readonly')
      
      const store = trans.objectStore(STORAGE_NAME)
      let stringsCount = 0
      trans.oncomplete = () => resolve(stringsCount)

      store.openCursor().onsuccess = e => {
        const cursor = e.target.result

        if (cursor) {

          let stringsChunk
          if(startsWithValue === null) {
            const t1 = performance.now()

            if(value1 === -Infinity && value2 === Infinity) stringsChunk = cursor.value
            else stringsChunk = cursor.value.filter(item => item.strInt >= value1 && item.strInt <= value2)

            const t2 = performance.now(),
                  duration = t2 - t1

            console.log(duration, true)
          } else {
            const t1 = performance.now()

            stringsChunk = cursor.value.filter(item => item.startsWith(startsWithValue))
            const t2 = performance.now(),
                  duration = t2 - t1

            console.log(duration, false)
          }
          
          stringsCount += stringsChunk.length
          cursor.continue()
        }
      }
    })
  },
  async saveStringsChunk (string) {
    let db = await this.getDb()

    return new Promise((resolve, reject) => {      
      let trans = db.transaction([STORAGE_NAME], 'readwrite'),
          store = trans.objectStore(STORAGE_NAME)

      trans.oncomplete = e => resolve(e)
      trans.onerror = e => reject(e)
      store.add(string)
    })
  }
}