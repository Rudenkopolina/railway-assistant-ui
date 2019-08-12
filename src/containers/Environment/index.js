import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getEnvironment } from '../../redux/actions/environment';
import EnvironmentPage from '../../components/EnvironmentPage';
import './styles.css';

class Environment extends React.Component {
  componentDidMount() {
    const { getEnvironment } = this.props;
    getEnvironment();
  }

  render() {
    const { environment } = this.props.environment;
    return (
        <EnvironmentPage environment={environment} />
    );
  }
}

const mapStateToProps = ({ environment }) => ({
  environment
});

const mapDispatchToProps = dispatch => ({
  getEnvironment: () => dispatch(getEnvironment())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Environment)
);
