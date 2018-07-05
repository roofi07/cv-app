import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import PropTypes from 'prop-types'
import './TextRow.scss'

export class TextRow extends React.Component {
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
    const { id, value } = e.target

    data = data.set(id, value)
    onUpdate(data)
  }

  render() {
    const { data } = this.props
    return (
      <div className="textrow">
        <div className="textrow__key">
          <input id="key" onChange={this.handleChange} placeholder="Enter descprition..." value={data.get('key', '')} />
        </div>
        <div className="textrow__value">
          <input id="value" onChange={this.handleChange} placeholder="Enter content..." value={data.get('value', '')} />
        </div>
      </div>
    )
  }
}

export default TextRow
