import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Navigation.css';

/* hér ætti að sækja gögn frá vefþjónustu fyrir valmynd */

const baseUrl = process.env.REACT_APP_SERVICE_URL;

export default class Navigation extends Component {
  state = { data: null, loading: true, error: false }

  async componentDidMount() {
    try {
      const data = await this.fetchData();
      this.setState({ data, loading: false });
    } catch (e) {
      console.error('Error fetching data', e);
      this.setState({ error: true, loading: false });
    }
  }
  async fetchData() {
    const response = await fetch(baseUrl);
    const data = await response.json();
    return data;
  }

  render() {
    const { data, loading, error } = this.state;
    // Til að ath hvaða linkur á að vera feitletraður, ef url er það sama og department.slug
    // verður classname á Link 'boldtrue', þá bold-ar css þennan link
    const url = window.location.pathname.replace('/', '');
    if (loading) {
      return (<div>Sæki gögn...</div>);
    }

    if (error) {
      return (<div>Villa við að sækja gögn</div>);
    }

    const proftoflur = data.schools;
    return (
      <div className="home">
        <h1>Próftöflur</h1>
        <nav>
          {proftoflur.map((department) => (
              <div key={department.slug}>
                <Link to={`/${department.slug}`} className={`bold${url===department.slug}`} >{department.name}</Link>
              </div>
            ))}
        </nav>
      </div>
    )
  }
}

