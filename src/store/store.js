import { M } from './types'
import ajaxActions from './ajaxActions'
import _ from 'lodash'

const state = {
  searchStr: '',
  nextPageToken: '',
  loadingNum: 30,
  location: '',
  searchResults: [
    { id: 0, title: 'データ1', body: 'データ1の内容です。123' },
    { id: 1, title: 'データ2', body: 'データ2の内容です。456' },
    { id: 2, title: 'データ3', body: 'データ3の内容です。789' }
  ],
  youTubeResults: []
}

const getters = {
  getSearchResults () {
    // console.log('state.searchResults= ', state.searchResults)
    return state.searchResults.filter(function (item) {
      return item.title.indexOf(state.searchStr) !== -1 || item.body.indexOf(state.searchStr) !== -1
    })
  },
  getYouTubeResults () {
    console.log(state.youTubeResults)
    return state.youTubeResults.map((item) => {
      return {
        title: item.title,
        body: item.description,
        thumb: _.get(item, `thumbnails.medium.url`)
      }
    })
  },
  getSearchStr () {
    // console.log('state.searchResults= ', state.searchResults)
    return state.searchStr
  }
}

const actions = {
  [M.CHANGE_SEARCH_STR] ({ commit }, str) {
    // console.log('store.actions:[M.CHANGE_SEARCH_STR] str= ', str)
    commit(M.CHANGE_SEARCH_STR, str)
    this.dispatch(M.CHANGE_SEARCH_RESULTS)
  },
  [M.CHANGE_SEARCH_RESULTS] ({ commit }) {
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

  [M.CHANGE_LOCATION] ({ commit }, locationStr) {
    // locationStr ko, jp, all
    commit(M.CHANGE_LOCATION, locationStr)
  }
}

const mutations = {
  [M.CHANGE_SEARCH_STR] (state, str) {
    state.loadingNum = 10
    if (str !== state.searchStr) {
      state.youTubeResults = []
      state.nextPageToken = ''
      state.loadingNum = 30
    }
    state.searchStr = str

    // console.log('mutation commit: [M.CHANGE_SEARCH_STR] state.searchStr= ', state.searchStr)
  },
  [M.CHANGE_SEARCH_RESULTS] (state, res) {
    // console.log('res.data.items= ', res.data.items)
    console.log(res)
    let newYouTubeResults = res.data.items.map((item) => {
      return item.snippet
    })
    console.log(state.youTubeResults.length)
    console.log(newYouTubeResults.length)
    state.youTubeResults = state.youTubeResults.concat(newYouTubeResults)

    console.log(state.youTubeResults.length)
    // console.log('mutation commit: [M.CHANGE_SEARCH_RESULTS] state.youTubeResults= ', state.youTubeResults)
  },

  [M.CHANGE_LOCATION] (state, locationStr) {
    // locationStr ko, jp, all
    let changeLocation = ''
    switch (locationStr) {
      case 'ko' :
        console.log(state.searchStr)
        if (state.searchStr !== 'mostPopularLoading') {
          changeLocation = '&location=36.868730, 127.508638&locationRadius=400km'
        }
        else {
          changeLocation = '&regionCode=KR'
        }
        break
      case 'jp' :
        if (state.searchStr !== 'mostPopularLoading') {
          changeLocation = '&location=35.053765, 140.310276&locationRadius=999km'
        }
        else {
          changeLocation = '&regionCode=JP'
        }
        break
      case 'all' :
        changeLocation = ''
        break
      default :
        changeLocation = ''
        break
    }

    state.location = changeLocation
    state.youTubeResults = []
    state.nextPageToken = ''
    state.loadingNum = 30
    console.log('changelocation !!')
    this.dispatch(M.CHANGE_SEARCH_RESULTS)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
