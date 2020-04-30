// actions.js
import {randomString} from '../utils/index'

self.onmessage = e => {
  if (e.data === 'generate') {
    const total = 10**7,
      stringLength = 100,
      strings = []

    // Perform the calculation
    self.postMessage({ type: 'SET_APP_LOADING' });

    while(strings.length < total) {
      strings.push(randomString(stringLength))
      console.log(strings.length)
    }

    self.postMessage({ type: 'SET_STRINGS', payload: strings });

    // Set the loading state back to false
    self.postMessage({ type: 'SET_APP_LOADING', payload: false });
  }
}