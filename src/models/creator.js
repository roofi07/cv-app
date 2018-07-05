import Immutable from 'immutable'
import window from '../utils/window'

const creator = {
  effects: {
    async getCreator() {
      const { localStorage } = window
      try {
        const jsonData = localStorage.getItem('CV')
        const modulesData = JSON.parse(jsonData) || []
        this.update(modulesData)
      } catch (err) {
        throw new Error(err)
      }
    },
    async setCreator(data) {
      const { localStorage } = window
      try {
        const jsonData = JSON.stringify(data.toJS())
        await localStorage.setItem('CV', jsonData)
        this.update(data)
      } catch (err) {
        throw new Error(err)
      }
    },
  },
  reducers: {
    update(state, payload) {
      const modulesData = Immutable.fromJS(payload)
      return { ...state, modulesData }
    },
  },
  state: {
    modulesData: Immutable.List(),
  },
}

export default creator
