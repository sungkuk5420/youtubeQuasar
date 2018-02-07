import axios from 'axios'
export default () => {
  return {
    queryYouTubeData (state, cSuccess, cError) {
      let options = {
        apikey: 'AIzaSyBTH4AgSAIAoyXu8XwzkKlsLdVuJxMPS0Q',
        encoded: encodeURI(state.searchStr),
        url () {
          console.log('state.searchStr!!! : ' + state.searchStr)
          console.log('state.nextPageToken!!! : ' + state.nextPageToken)

          let apiURL = ''
          if (state.searchStr === '') {
            apiURL = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=${state.loadingNum}&key=${options.apikey}`
          }
          else {
            // search
            apiURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${options.apikey}&q=${options.encoded}&type=video&maxResults=${state.loadingNum}`
          }
          let nextPage = state.nextPageToken !== '' ? '&pageToken=' + state.nextPageToken : ''
          if (nextPage !== '') {
            apiURL += nextPage
          }
          let location = state.location !== '' ? state.location : ''
          if (location !== '') {
            apiURL += location
          }

          console.log(apiURL)
          return apiURL
        }
      }
      let api = axios.create()
      // console.log('url= ', options.url())
      axios.all(
        [
          api.get(options.url())
        ]
      ).then(
        (responses) => {
          // console.log(responses)
          state.nextPageToken = responses[0].data.nextPageToken
          let errors = responses.filter((res) => {
            return res.status !== 200
          })
          if (errors.length < 1) {
            // console.log('200 response= ', responses[0])
            cSuccess(responses[0])
          }
          else {
            let errmsgs = errors.reduce((memo = '', res) => {
              return memo + `${res.status} : ${res.message}\n`
            }, '')
            console.warn(errmsgs)
          }
        }
      )
    }
  }
}
