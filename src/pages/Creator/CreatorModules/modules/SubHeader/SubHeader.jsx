import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import PropTypes from 'prop-types'
import './SubHeader.scss'

export class SubHeader extends React.Component {
  static propTypes = {
    data: ImmutablePropTypes.map,
    onUpdate: PropTypes.func,
  }

  constructor() {
    super()

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    const { onUpdate } = this.props
    let { data } = this.props
    const { value } = e.target

    data = data.set('value', value)
    onUpdate(data)
  }

  render() {
    const { data } = this.props
    return (
      <div className="subheader">
        <input onChange={this.handleChange} placeholder="Enter subheader..." value={data.get('value', '')} />
      </div>
    )
  }
}

export default SubHeader
