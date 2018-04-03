import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

import './School.css';
import Exams from '../department/';
import NotFound from '../not-found';

/**
 * Í þessum component ætti að vera mest um að vera og séð um að:
 * - Sækja gögn fyrir svið og birta
 * - Opna/loka deildum
 */

const baseUrl = process.env.REACT_APP_SERVICE_URL;

export default class School extends Component {
  state = { data: null, loading: true, error: false, visibleExam: null }

  onHeaderClick = (examId) => {
    return (e) => {
      const visibleExam = this.state.visibleExam === examId ? null : examId;
      this.setState({ visibleExam });
    }
  }

  async componentDidMount() {
      const { match } = this.props;
      this.handleDepartment(match);
  }

  async componentWillReceiveProps(nextProps){
    this.setState({data: null, loading: true, error: false, visibleExam: null});
    const { match } = nextProps;
    this.handleDepartment(match);
  }

  async handleDepartment(match) {
    try {
      const slug = match.params.department;
      const data = await this.fetchData(`${baseUrl}${slug}`);
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
    const { data, loading, error, visibleExam } = this.state;
    if (loading) {
      return (<div>Sæki gögn...</div>);
    }

    if (error) {
      return (<div>Villa við að sækja gögn</div>);
    }

    if(data.error){
      return (<NotFound/>);
    }
    return (
      <section className="school">
        <Helmet title={`${data.school.heading} - Próftöflur`} />
        <h2>{data.school.heading}</h2>
        <ul>
        {data.school.departments.map((department) => (
          <Exams 
            key = {department.heading}
            title = {department.heading}
            data = {department.tests}
            visible = {visibleExam === department.heading}
            onHeaderClick = {(this.onHeaderClick(department.heading))}  
          />
        ))}
        </ul>

        <p className="home"><Link to="/">Heim</Link></p>
      </section>
    );
  }
}

School.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      department: PropTypes.string
    })
  })
};

School.defaultProps = {
  match: null
}
