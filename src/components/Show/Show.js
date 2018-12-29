import React, { Component } from 'react';

import './Show.css'

import { getShowInfo } from '../../api'

export default class Show extends Component {
  state = {
    showId: '',
    data: null
  }

  componentDidUpdate(prevProps) {
    const { showId } = this.props;

    if (prevProps.showId !== showId) {
      this.setState({ showId: showId, data: null });

      getShowInfo(showId).then(data => {
        this.setState({ data });
      });
    }
  }

  render() {
    const { showId } = this.props
    const { data } = this.state
    if (!showId || data == null) return <p className="show-inforation t-show-info">Шоу не выбрано</p>
    console.log(data)
    return (
      <div className="show">
        <h2>{showId}</h2>
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