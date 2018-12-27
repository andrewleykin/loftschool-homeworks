import React, { Component } from 'react';

import './Show.css'

import { getShowInfo } from '../../api'

export default class Show extends Component {
  state = {
    showId: '',
    data: null
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return { showId: nextProps.showId }
  }

  componentDidUpdate() {
    const { showId } = this.state
    getShowInfo(showId).then(response=> {
      this.setState({ data: response })
    })
  }

  render() {
    const { showId, data } = this.state
    if (!showId) return <p className="show-inforation t-show-info">Шоу не выбрано</p>
    if (!data) return ''
    return (
      <div className="show">
        <img className="show-image" src={data.image.medium} alt={data.name} />
        <h2 className="show-label t-show-name">{data.name}</h2>
        <p className="show-text t-show-genre">
          <b>Жанр: </b>
          {data.genres.join(', ')}
        </p>
        <p className="show-text t-show-summary" dangerouslySetInnerHTML={{__html: data.summary}}></p>
      </div>
    )
  }
}