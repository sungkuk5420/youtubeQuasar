import { M } from './types'
import ajaxActions from './ajaxActions'
import _ from 'lodash'
import router from 'router'

const state = {
  searchStr: '',
  nextPageToken: '',
  loadingNum: 30,
  location: '&regionCode=KR',
  youTubeResults: [],
  playerSettings: {
    videoId: '',
    videoWidth: '',
    videoHeight: '',
    iframeWidth: '',
    iframeHeight: '',
    respomsiveMode: ''
  }
}

const getters = {
  getYouTubeResults() {
    console.log(state.youTubeResults)
    return state.youTubeResults.map((item) => {
      return {
        title: item.title,
        body: item.description,
        id: item.id.videoId || item.id,
        videoWidth: _.get(item, `thumbnails.medium.width`),
        videoHeight: _.get(item, `thumbnails.medium.height`),
        thumb: _.get(item, `thumbnails.medium.url`)
      }
    })
  },
  getSearchStr() {
    // console.log('state.searchResults= ', state.searchResults)
    return state.searchStr
  },
  getPlayerSettings() {
    return state.playerSettings
  },
  getNextPageToken() {
    return state.nextPageToken
  }
}

const actions = {
  [M.CHANGE_SEARCH_STR]({ commit }, str) {
    // console.log('store.actions:[M.CHANGE_SEARCH_STR] str= ', str)
    commit(M.CHANGE_SEARCH_STR, str)
    this.dispatch(M.CHANGE_SEARCH_RESULTS)
  },
  [M.CHANGE_SEARCH_RESULTS]({ commit }) {
    ajaxActions().queryYouTubeData(
      state,
      (results) => {
        // console.log('action / CHANGE_SEARCH_RESULTS / success')
        // console.log('results= ', results)
        commit(M.CHANGE_SEARCH_RESULTS, results)
      },
      (res) => {
        // console.log('action / CHANGE_SEARCH_RESULTS / error', res)
        commit(M.CHANGE_SEARCH_RESULTS)
      }
    )
  },

  [M.CHANGE_LOCATION]({ commit }, locationStr) {
    // locationStr ko, jp, all
    commit(M.CHANGE_LOCATION, locationStr)
  },

  [M.OPEN_PLAYER]({ commit }, settings) {
    console.log('settings= ', settings)
    commit(M.OPEN_PLAYER, settings)
  },

  [M.CHANGE_PLAYER_SIZE]({ commit }, settings) {
    console.log('settings= ', settings)
    commit(M.CHANGE_PLAYER_SIZE, settings)
  }
}

const mutations = {
  [M.CHANGE_SEARCH_STR](state, str) {
    state.loadingNum = 30
    if (str !== state.searchStr) {
      state.youTubeResults = []
      state.nextPageToken = ''
      state.loadingNum = 30
    }
    state.searchStr = str

    // console.log('mutation commit: [M.CHANGE_SEARCH_STR] state.searchStr= ', state.searchStr)
  },
  [M.CHANGE_SEARCH_RESULTS](state, res) {
    // console.log('res.data.items= ', res.data.items)
    console.log(res)
    let newYouTubeResults = res.data.items.map((item) => {
      item.snippet.id = item.id
      return item.snippet
    })
    console.log(state.youTubeResults.length)
    console.log(newYouTubeResults.length)
    state.youTubeResults = state.youTubeResults.concat(newYouTubeResults)

    console.log(state.youTubeResults.length)
    // console.log('mutation commit: [M.CHANGE_SEARCH_RESULTS] state.youTubeResults= ', state.youTubeResults)
  },

  [M.CHANGE_LOCATION](state, locationStr) {
    // locationStr ko, jp, all
    let changeLocation = ''
    switch (locationStr) {
      case 'ko':
        console.log(state.searchStr)
        if (state.searchStr !== '') {
          changeLocation = '&location=36.868730, 127.508638&locationRadius=400km'
        }
        else {
          changeLocation = '&regionCode=KR'
        }
        break
      case 'jp':
        if (state.searchStr !== '') {
          changeLocation = '&location=35.053765, 140.310276&locationRadius=999km'
        }
        else {
          changeLocation = '&regionCode=JP'
        }
        break
      case 'all':
        changeLocation = ''
        break
      default:
        changeLocation = ''
        break
    }

    state.location = changeLocation
    state.youTubeResults = []
    state.nextPageToken = ''
    state.loadingNum = 30
    console.log('changelocation !!')
    this.dispatch(M.CHANGE_SEARCH_RESULTS)
  },

  [M.OPEN_PLAYER](state, settings) {
    console.log('settings= ', settings)
    state.playerSettings = settings
    console.log('mutation commit: [M.OPEN_PLAYER] state.playerSettings= ', state.playerSettings)
    router.push({ path: `/player?playerId=${state.playerSettings.videoId}` })
  },

  [M.CHANGE_PLAYER_SIZE](state, settings) {
    console.log('settings= ', settings)
    state.playerSettings.iframeWidth = settings.iframeWidth
    state.playerSettings.iframeHeight = settings.iframeHeight
    state.playerSettings.respomsiveMode = settings.respomsiveMode
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
