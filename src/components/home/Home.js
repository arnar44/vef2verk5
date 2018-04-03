import React, { Component } from 'react';
import Helmet from 'react-helmet';

import './Home.css';

/* hér ætti að sækja forsíðu vefþjónustu til að sækja stats */

const baseUrl = process.env.REACT_APP_SERVICE_URL;

export default class Home extends Component {
  state = { data: null, loading: true, error: false }

  async componentDidMount() {
    try {
      const data = await this.fetchData(`${baseUrl}stats`);
      this.setState({ data, loading: false });
    } catch (e) {
      console.error('Error fetching data', e);
      this.setState({ error: true, loading: false });
    }
  }
  async fetchData(finalUrl) {
    const response = await fetch(finalUrl);
    const data = await response.json();
    return data;
  }

  render() {
    const { data, loading, error } = this.state;
    if (loading) {
      return (
        <div>
          <div>Sæki gögn...</div>
          <Helmet title="Sæki gögn..." />
        </div>
      );
    }

    if (error) {
      return (
        <div>
          <div>Villa við að sækja gögn</div>
          <Helmet title="Villa við að sækja gögn" />
        </div>
      );
    }
    return (
      <div className="home">
      <Helmet title="Próftöflur" />
        <h2>Tölfræði</h2>
          <div className="stat">
            <p className="statName">Fjöldi prófa</p>
            <p>{data.stats.numTests}</p>
          </div>
          <div className="stat">
            <p className="statName">Fjöldi nemenda í öllum prófum</p>
            <p>{data.stats.numStudents}</p>
          </div>
          <div className="stat">
            <p className="statName">Meðalfjöldi nemenda í prófi</p>
            <p>{data.stats.averageStudents}</p>
          </div>
          <div className="stat">
            <p className="statName">Minnsti fjöldi nemenda í prófi</p>
            <p>{data.stats.min}</p>
          </div>
          <div className="stat">
            <p className="statName">Mesti fjöldi nemenda í prófi</p>
            <p>{data.stats.max}</p>
          </div>
      </div>
    )
  }
}
