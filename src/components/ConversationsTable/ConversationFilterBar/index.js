import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Input, Checkbox, Button } from 'semantic-ui-react';
import './styles.css';
import moment from 'moment';
import { DateTimeInput } from 'semantic-ui-calendar-react';

class ConversationFilterBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mass: {
        "TELEGRAM": false,
        "VIBER": false,
        "PSTN": false,
        "ALL": true
      },
      fromDate: '',
      toDate: '',
      source: "ALL"
    };
  }

  onFilterChange = (name, value) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  };

  onCheckBoxChange = (event, element) => {
    let state = this.state;

    state.source = element.label;

    state.mass["TELEGRAM"] = false;
    state.mass["VIBER"] = false;
    state.mass["PSTN"] = false;
    state.mass["ALL"] = false;

    state.mass[element.label] = !state.mass[element.label];

    this.setState(state);
  };

  makeSearch = () => {
    this.props.setNewFilterParameters(
      this.state.fromDate ? moment(this.state.fromDate, 'DD-MM-YYYY HH:mm').utc().format('YYYY-MM-DD HH:mm:ss') : undefined,
      this.state.toDate ? moment(this.state.toDate, 'DD-MM-YYYY HH:mm').utc().format('YYYY-MM-DD HH:mm:ss') : undefined,
      !!this.state.source.localeCompare("ALL") ? this.state.source : undefined,
      this.state.type ? this.state.type : undefined
    );
  };

  render() {
    return (
      <div className='flex-filter'>
        <div className='side-margin'>
          <DateTimeInput
            localization='ru'
            id="1"
            name="fromDate"
            placeholder="Дата начала"
            iconPosition="left"
            onChange={(event, {name, value}) => this.onFilterChange(name, value)}
            value={this.state.fromDate}
          />
        </div>
        <div className='side-margin'>
          <DateTimeInput
            localization='ru'
            id="2"
            name="toDate"
            placeholder="Дата конца"
            iconPosition="left"
            onChange={(event, {name, value}) => this.onFilterChange(name, value)}
            value={this.state.toDate}
          />
        </div>
        <div className='flex-filter center-filter-items'>
          {Object.keys(this.state.mass).map((m, i) => (
            <Checkbox key={i} className='side-margin' label={m} checked={this.state.mass[m]} onChange={this.onCheckBoxChange} />
          ))}
        </div>
        <Button
          className='side-margin'
          circular
          icon='search'
          onClick={this.makeSearch}
        />
      </div>
    );
  }
}

ConversationFilterBar.propTypes = {
  setNewFilterParameters: PropTypes.func.isRequired
};

export default withRouter(ConversationFilterBar);
