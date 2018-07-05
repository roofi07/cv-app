import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { SubHeader, TextRow, Modules } from './modules'
import './CreatorModule.scss'


export class CreatorModule extends React.Component {
  static propTypes = {
    moduleData: ImmutablePropTypes.map,
    onRemove: PropTypes.func,
    onUpdate: PropTypes.func,
  }

  constructor() {
    super()

    this.updateData = this.updateData.bind(this)
    this.remove = this.remove.bind(this)
  }

  getModule() {
    const { moduleData } = this.props

    switch (moduleData.get('type')) {
      case Modules.TEXT_ROW:
        return <TextRow data={moduleData.get('data')} onUpdate={this.updateData} />
      case Modules.SUB_HEADER:
        return <SubHeader data={moduleData.get('data')} onUpdate={this.updateData} />
      default:
        return null
    }
  }

  remove() {
    const { moduleData, onRemove } = this.props
    onRemove(moduleData.get('id'))
  }

  updateData(data) {
    const { moduleData, onUpdate } = this.props
    const newData = moduleData.set('data', data)
    onUpdate(newData)
  }

  render() {
    return (
      <div className="creator-module">
        {this.getModule()}
        <button className="creator-module__remove-btn" onClick={this.remove} title="Remove"><i className="fa fa-ban" /></button>
      </div>
    )
  }
}

export default CreatorModule
