import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getMonitoring, updateMonitoringItem } from '../../redux/actions/monitoring';
import MonitoringCards from '../../components/MonitoringCards';
import './styles.css';
class MonitoringPage extends React.Component {
	componentDidMount() {
		const { getMonitoring } = this.props;
		getMonitoring();
	}

  onItemUpdateClick = itemIndex => {
	const { updateMonitoringItem } = this.props;
    updateMonitoringItem(itemIndex);
  };

  render() {
	const { monitoring } = this.props;
    return <MonitoringCards onItemUpdateClick={this.onItemUpdateClick} monitoring={monitoring} />;
  }
}

const mapStateToProps = ({ monitoring }) => ({ monitoring });

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
