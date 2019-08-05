import React from 'react';
import { withRouter } from 'react-router-dom';
import './styles.css';
import { connect } from 'react-redux';
import {
  getMonitoring,
  updateMonitoringItem
} from '../../redux/actions/monitoring';
import MonitoringCards from '../../components/MonitoringCards';
class MonitoringPage extends React.Component {
  componentWillMount() {
    this.props.getMonitoring();
  }

  onItemUpdateClick = itemIndex => {
    this.props.updateMonitoringItem(itemIndex);
  };

  render() {
    return <MonitoringCards monitoring={this.props.monitoring} />;
  }
}

const mapStateToProps = ({ monitoring }) => ({
  monitoring
});

const mapDispatchToProps = dispatch => ({
  getMonitoring: () => dispatch(getMonitoring()),
  updateMonitoringItem: id => dispatch(updateMonitoringItem(id))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MonitoringPage)
);
