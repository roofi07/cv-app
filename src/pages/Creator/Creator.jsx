import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'
import './Creator.scss'
import CreatorModule from './CreatorModules/CreatorModule'
import { Modules } from './CreatorModules/modules'

export class Creator extends React.Component {
  static propTypes = {
    getCreator: PropTypes.func,
    modulesData: ImmutablePropTypes.list,
    setCreator: PropTypes.func,
  }

  constructor() {
    super()

    this.removeModule = this.removeModule.bind(this)
    this.updateModule = this.updateModule.bind(this)
    this.save = this.save.bind(this)
    this.reset = this.reset.bind(this)

    this.state = {
      modulesData: Immutable.List(),
    }
  }

  async componentWillMount() {
    const { getCreator } = this.props

    await getCreator()

    const { modulesData } = this.props

    this.setState({ modulesData })
  }

  removeModule(id) {
    let { modulesData } = this.state

    modulesData = modulesData.filter(a => a.get('id') !== id)

    this.setState({ modulesData })
  }

  updateModule(moduleData) {
    let { modulesData } = this.state

    modulesData = modulesData.update(
      modulesData.findIndex(a => a.get('id') === moduleData.get('id')),
      a => a.set('data', moduleData.get('data'))
    )

    this.setState({ modulesData })
  }

  save() {
    const { modulesData } = this.state

    this.props.setCreator(modulesData)
  }

  reset() {
    const { modulesData } = this.props

    this.setState({ modulesData })
  }

  addModule(type) {
    let { modulesData } = this.state

    modulesData = modulesData.push(Immutable.Map({
      data: Immutable.Map(),
      id: new Date().valueOf(),
      type,
    }))

    this.setState({ modulesData })
  }

  render() {
    const { modulesData } = this.state

    return (
      <div className="creator">
        <div className="creator__cv">
          {!modulesData.size && (
            <div className="creator__cv-empty">
              Add your first data row! You can choose one of them on right side.
            </div>
          )}
          {modulesData.map(m => (
            <CreatorModule
              key={m.get('id')}
              moduleData={m}
              onRemove={this.removeModule}
              onUpdate={this.updateModule}
            />
          ))}
        </div>
        <div className="creator__tools">
          <div className="creator__actions">
            <button className="creator__action-btn creator__action-btn--default" onClick={this.save}>Save</button>
            <button className="creator__action-btn creator__action-btn--secondary" onClick={this.reset}>Reset</button>
          </div>
          <h3>Tools</h3>
          {Object.keys(Modules).map(a => (
            <button className="creator__tool-btn" key={a} onClick={() => this.addModule(Modules[a])}>
              <i className="fa fa-plus" /> Add {Modules[a]}
            </button>
          ))}
        </div>
      </div>
    )
  }
}

const mapState = ({ creator }) => ({
  modulesData: creator.modulesData,
})

const mapDispatch = ({ creator: { getCreator, setCreator } }) => ({
  getCreator,
  setCreator,
})

export default withRouter(connect(mapState, mapDispatch)(Creator))
