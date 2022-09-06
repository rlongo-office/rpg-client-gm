// Rest Calls for CRUD functions
// websocket functionality for messaging
type AnyObject = {
  [key: string]: any
}
/*
Game object will hold world time, local weather, party location, curernt campaign:adventure:scenario
*/

const spellUrl = 'https://www.dnd5eapi.co/api/spells'
const heroku = 'https://rpg-dnd-server.herokuapp.com'

const apiUtils = {
  grabSpell: (spell = 'acid-arrow') => {
    return fetch(`${spellUrl}/${spell}`).then(res => res.json())
  },

  authenticate: (username: string, password: string) => {
    const utfUsername = encodeURIComponent(username)
    const utfPassword = encodeURIComponent(password)
    return fetch(`${heroku}/login?username=${utfUsername}&password=${utfPassword}`)
  },

  getGameObject: async () => {
    const obj = await fetch('http://localhost:8080/getGameObject')
    //.then (response=> response.json())
    //.then ((json) => {
    //    console.log(json)
    //})
    return obj.json()
  },
  setGameObject: (obj: AnyObject) => {
    const newGameObj = { name: 'game', time: 12356, hour: 12, weather: 55 }
    return postData(`http://localhost:8080/getGameObject`, obj)
  },
}

async function postData(url: string, data: object) {
  // Default options are marked with *
  let response: any
  response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    //mode: 'no-cors', // no-cors, *cors, same-origin
    //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //credentials: 'omit', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    //redirect: 'follow', // manual, *follow, error
    //referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
  return response // parses JSON response into native JavaScript objects
}

export default apiUtils
